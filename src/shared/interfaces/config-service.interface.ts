import { INestApplication } from '@nestjs/common';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';

export interface ConfigServiceInterface {
  getPort(): number;
  getCustomKey(key: string): string;
  configureApp(app: INestApplication): void;
  getValidationOptions(transform?: true): ValidationPipeOptions;
  getMongoDbConfig(): string;
  getGraphQLModuleConfig(): ApolloDriverConfig;
  getRedisConfig(): RedisModuleOptions;
}
