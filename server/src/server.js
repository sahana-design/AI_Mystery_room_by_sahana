import { validateEnv } from './config/env.js';
import connectDatabase from './config/database.js';
import { createGeminiService } from './services/geminiService.js';
import { createMysteryService } from './services/mysteryService.js';
import { createApp } from './app.js';
try{const config=validateEnv();await connectDatabase(config.mongoUri);const gemini=createGeminiService(config);const service=createMysteryService(gemini,config);const app=createApp({service,config});app.listen(config.port,()=>console.log(`AI Mystery Room API listening on port ${config.port}`))}catch(error){console.error(`Startup failed: ${error.message}`);process.exit(1)}
