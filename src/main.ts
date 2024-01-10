import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');
  const config = new DocumentBuilder()
    .setTitle('Nest Challenge')
    .setDescription('nest challenge')
    .setVersion('1.0')
    .addTag('NEST')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const port = process.env.APP_PORT || 3000;
  const logger = new Logger('Bootstrap');
  logger.log(`Running on ${port} port.`);
  await app.listen(port);
}
bootstrap();
