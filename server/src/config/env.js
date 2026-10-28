import dotenv from 'dotenv';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
dotenv.config({ path: resolve(dirname(fileURLToPath(import.meta.url)), '../../.env') });
const required=['MONGODB_URI','GEMINI_API_KEY','SESSION_SECRET'];
export function validateEnv(){const missing=required.filter(k=>!process.env[k]);if(missing.length)throw new Error(`Missing required environment variables: ${missing.join(', ')}. Copy server/.env.example to server/.env and configure the server.`);if(process.env.SESSION_SECRET.length<32)throw new Error('SESSION_SECRET must be at least 32 characters.');return{port:Number(process.env.PORT||5000),mongoUri:process.env.MONGODB_URI,apiKey:process.env.GEMINI_API_KEY,model:process.env.GEMINI_MODEL||'gemini-3.8-flash',timeout:Number(process.env.GEMINI_TIMEOUT_MS||60000),retries:Math.min(4,Math.max(0,Number(process.env.GEMINI_MAX_RETRIES??2))),clientOrigin:process.env.CLIENT_ORIGIN||'http://localhost:5173',sessionSecret:process.env.SESSION_SECRET,nodeEnv:process.env.NODE_ENV||'development'}}
