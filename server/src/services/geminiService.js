import { GoogleGenAI } from '@google/genai';
import { generatedMysterySchema, validateMysteryConsistency } from '../schemas/mysterySchema.js';
import { buildMysteryPrompt } from '../prompts/mysteryPrompt.js';

export function createGeminiService(config){
  const ai=new GoogleGenAI({apiKey:config.apiKey});
  return {async generate(input){
    let last;
    for(let attempt=0;attempt<=config.retries;attempt++){
      try{
        let timer;
        let response;
        try{response=await Promise.race([ai.models.generateContent({model:config.model,contents:buildMysteryPrompt(input),config:{responseMimeType:'application/json',temperature:0.8}}),new Promise((_,reject)=>{timer=setTimeout(()=>reject(new Error('AI request timed out')),config.timeout)})])}finally{clearTimeout(timer)}
        const text=response.text?.trim();
        if(!text)throw new Error('AI returned an empty response');
        const payload=JSON.parse(text);
        if(payload.refused){const refused=new Error(payload.message||'Please fictionalize the scenario before creating this case.');refused.code='SCENARIO_REFUSED';throw refused}
        const parsed=generatedMysterySchema.parse(payload);
        validateMysteryConsistency(parsed,input.suspectCount);
        return parsed;
      }catch(error){if(error.code==='SCENARIO_REFUSED')throw error;last=error}
    }
    const wrapped=new Error('Mystery generation failed validation or the AI provider was unavailable. Please try again.');
    wrapped.cause=last;wrapped.code='GENERATION_FAILED';throw wrapped;
  }}
}
