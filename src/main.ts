import { NestFactory } from '@nestjs/core';
import { INestApplicationContext } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import express from 'express';
import { AppModule } from './app.module.js';

async function bootstrap(
  adapter: ExpressAdapter,
): Promise<INestApplicationContext> {
  const app = await NestFactory.create(AppModule, new ExpressAdapter(adapter));

  const t = app.getHttpAdapter();
  t.get('/test2', (req, res) => {
    res.send('Hello Test2!');
  });

  return app;
}

async function init() {
  const app = express();
  const server = app.listen(3000, () => {
    console.log('server started');
  });

  app.get('/test', (req, res) => {
    // If adapter.setHttpServer(server) is NOT called
    // This route should not work
    // But it works either way.
    res.send('Hello Test!');
  });

  const adapter = new ExpressAdapter(app);

  // This line shouldn't be needed.
  // adapter.setHttpServer(server);

  const nest: INestApplicationContext = await bootstrap(adapter);

  await nest.init();
}
init();
