import { Module } from '@nestjs/common';
import { RedisModule as NestJsRedis } from '@liaoliaots/nestjs-redis';
import { configService } from '../../shared/config/config.service';

@Module({
  imports: [NestJsRedis.forRoot(configService.getRedisConfig())],
  providers: [],
})
export class RedisModule {}
