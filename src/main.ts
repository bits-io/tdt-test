import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { initializeTransactionalContext, StorageDriver } from 'typeorm-transactional';
import { NestExpressApplication } from '@nestjs/platform-express';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { useContainer } from 'class-validator';
import { join } from 'path';
import { redisOptions } from './configs/redis.config';
import bodyParser from 'body-parser';

async function bootstrap() {
  initializeTransactionalContext({ storageDriver: StorageDriver.AUTO });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useGlobalPipes(new ValidationPipe());
  useContainer(app.select(AppModule), { fallbackOnErrors: true });  
  app.setGlobalPrefix('api/');

  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));
  app.useStaticAssets(join(__dirname, '../..', 'storage'), { prefix: '/storage/' });
  app.useStaticAssets(join(__dirname, '../..', 'files'), { prefix: '/files/' });
  // app.connectMicroservice(redisOptions());

  app.useBodyParser('json', { limit: '1GB' });
  app.useBodyParser('urlencoded', { limit: '1GB' });
  
  app.enableCors();
  await app.startAllMicroservices();
  await app.listen(3000);
}
bootstrap();
