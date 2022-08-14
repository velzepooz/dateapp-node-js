import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { configService } from './shared/config/config.service';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger();
  const app = await NestFactory.create(AppModule);
  await app.listen(configService.getPort());

  logger.log(`App is running on port: ${configService.getPort()}`);
}
bootstrap();
