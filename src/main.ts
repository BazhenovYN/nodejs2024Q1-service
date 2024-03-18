import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppConfigType } from 'config';
import { LoggerService } from 'logger/logger.service';
import { AppModule } from './app.module';

const logger = new Logger('Application');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.useLogger(app.get(LoggerService));

  const config = new DocumentBuilder()
    .setTitle('Home Library Service')
    .setDescription('Home music library service')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const configService = app.get(ConfigService<AppConfigType, true>);
  const port = configService.get('port', { infer: true });

  await app.listen(port);
}

process.on('uncaughtException', (error) => {
  logger.error(`Uncaught exception: ${error}`);
});
process.on('unhandledRejection', (error) => {
  logger.error(`Unhandled Rejection: ${error}`);
});

bootstrap();
