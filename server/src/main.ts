import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as express from 'express';
const user = require('../routes/users.js')
const port = 3000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Integrate Express.js middleware
  const expressApp = app.getHttpAdapter().getInstance();
  expressApp.use('/user', user);

  await app.listen(port, () => {
    console.log(`http://localhost:${port}`);
  });
}
bootstrap();
