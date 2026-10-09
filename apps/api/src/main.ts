import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';

const server = express();
let isReady = false;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(server));

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  await app.init();
  isReady = true;
  return app;
}

// Serverless function handler for Vercel deployment
export default async function handler(req: any, res: any) {
  if (!isReady) {
    await bootstrap();
  }
  server(req, res);
}

// Standalone execution for local development
if (!process.env.VERCEL) {
  const app = await bootstrap();
  const port = process.env.PORT ?? 3000;
  await app.listen(port);
  console.log(`Backend API running on http://localhost:${port}`);
}
