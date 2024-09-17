import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { loggerGlobal } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.use(loggerGlobal);
  const swaggerConfig = new DocumentBuilder()
  .setTitle("Ecommerce Henry")
  .setDescription("Its a API build with NextJS for module 4 into backend specialization of Full Stack.")
  .setVersion("1.0")
  .addBearerAuth()
  .build()
  const document = SwaggerModule.createDocument(app,swaggerConfig);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}

bootstrap();
