import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import healthRoutes from './routes/healthRoutes.js';
import mysteryRoutes from './routes/mysteryRoutes.js';
import { createLimiter } from './middleware/rateLimiter.js';
import { sessionMiddleware } from './middleware/session.js';
import { errorHandler, notFound } from './middleware/errorHandler.js';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const clientDist = resolve(fileURLToPath(new URL('../../client/dist', import.meta.url)));

export function createApp({ service, config }) {
  const app = express();
  app.set("trust proxy", 1);
  app.disable('x-powered-by');
  app.use(helmet());
  app.use(cors({ origin: config.clientOrigin, credentials: true }));
  app.use(express.json({ limit: '32kb' }));
  app.use(cookieParser());
  app.use('/api/v1', createLimiter);
  app.use('/api/v1', sessionMiddleware(config.sessionSecret, config.nodeEnv === 'production'));
  app.use('/api/v1/health', healthRoutes);
  app.use('/api/v1/mysteries', mysteryRoutes(service));

  // In production the same service hosts the built Vite app and API.
  if (existsSync(clientDist)) {
    app.use(express.static(clientDist, { index: false }));
    app.get('*', (req, res, next) => {
      if (req.path.startsWith('/api/')) return next();
      return res.sendFile(resolve(clientDist, 'index.html'));
    });
  }

  app.use(notFound);
  app.use(errorHandler);
  return app;
}
