import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import { join } from 'path';
import * as fs from 'fs'
import { AppModule } from './app.module';

async function bootstrap() {
  const dir = join(process.cwd(), "images")
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir)
  }

  const app = await NestFactory.create(AppModule);
  app.enableCors({
    credentials: true,
    origin: "http://localhost:5050"
  });
  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe());
  const configService = app.get(ConfigService);
  const config = new DocumentBuilder()
    .setTitle('NMCNPM BACKEND')
    .setDescription('Hotels Mangagement API')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);
  await app.listen(configService.get("RUNNING_PORT"));
}
bootstrap();
