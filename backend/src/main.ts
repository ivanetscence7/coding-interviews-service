import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { HttpExceptionFilter } from './interviews/exceptionfilter/HttpExceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const URL = configService.get<string>('FRONTEND_URL');
  app.enableCors({
    credentials: false,
  });
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(configService.get<string>('PORT'));
}
bootstrap();
