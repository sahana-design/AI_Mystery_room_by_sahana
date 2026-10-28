import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/healthRoutes.js';
import mysteryRoutes from './routes/mysteryRoutes.js';
import { createLimiter } from './middleware/rateLimiter.js';
import { sessionMiddleware } from './middleware/session.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
export function createApp({service,config}){const app=express();app.disable('x-powered-by');app.use(helmet());app.use(cors({origin:config.clientOrigin,credentials:true}));app.use(express.json({limit:'32kb'}));app.use(cookieParser());app.use('/api/v1',createLimiter);app.use('/api/v1',sessionMiddleware(config.sessionSecret,config.nodeEnv==='production'));app.use('/api/v1/health',healthRoutes);app.use('/api/v1/mysteries',mysteryRoutes(service));app.use(notFound);app.use(errorHandler);return app}
