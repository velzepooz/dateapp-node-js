import { INestApplication } from '@nestjs/common';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { ApolloDriverConfig } from '@nestjs/apollo';

export interface ConfigServiceInterface {
  getPort(): number;
  getCustomKey(key: string): string;
  configureApp(app: INestApplication): void;
  getValidationOptions(transform?: true): ValidationPipeOptions;
  getMongoDbConfig(): string;
  getGraphQLModuleConfig(): ApolloDriverConfig;
}
