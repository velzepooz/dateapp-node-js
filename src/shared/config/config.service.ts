import morgan from 'morgan';
import dotenv from 'dotenv';
import { join } from 'path';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { RedisModuleOptions } from '@liaoliaots/nestjs-redis';
import { PubSubRedisOptions } from 'graphql-redis-subscriptions/dist/redis-pubsub';
import { HttpException, HttpStatus, INestApplication } from '@nestjs/common';
import { ValidationPipeOptions } from '@nestjs/common/pipes/validation.pipe';
import { ConfigServiceInterface } from '../interfaces/config-service.interface';
import { graphQlRedisPubSubConfig, redisConfig } from './redis.config';

dotenv.config({ path: `.${process.env.NODE_ENV || 'development'}.env` });

class ConfigService implements ConfigServiceInterface {
  constructor(private env: { [k: string]: string | undefined }) {}

  getPort(): number {
    return +this.getValue('PORT', true);
  }

  getCustomKey(key: string): string {
    return this.getValue(key, true);
  }

  configureApp(app: INestApplication): void {
    app.enableCors({
      origin: '*',
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    });

    app.setGlobalPrefix('');
    app.use(morgan('tiny'));
  }

  getValidationOptions(transform?: true): ValidationPipeOptions {
    const options: ValidationPipeOptions = {
      whitelist: true,
      validateCustomDecorators: true,
    };

    if (transform) {
      return {
        ...options,
        stopAtFirstError: false,
        transform: true,
        forbidNonWhitelisted: false,
        transformOptions: {
          enableImplicitConversion: true,
          exposeDefaultValues: true,
        },
      };
    }

    return options;
  }

  getMongoDbConfig(): string {
    return this.getValue('MONGO_URL');
  }

  getGraphQLModuleConfig(): ApolloDriverConfig {
    return {
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: this.getValue('GRAPHQL_PLAYGROUND') === 'true',
      subscriptions: {
        'subscriptions-transport-ws': true,
      },
    };
  }

  getRedisConfig(): RedisModuleOptions {
    return {
      config: redisConfig[process.env.NODE_ENV],
    };
  }

  getGraphQlPubSubOptions(): PubSubRedisOptions {
    return {
      connection: `redis://${
        graphQlRedisPubSubConfig[process.env.NODE_ENV].host
      }:${
        graphQlRedisPubSubConfig[process.env.NODE_ENV].port
      }?defaultDatabase=${
        graphQlRedisPubSubConfig[process.env.NODE_ENV].db
      }&connectionName=${
        graphQlRedisPubSubConfig[process.env.NODE_ENV].namespace
      }` as any,
    };
  }

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];

    if (!value && throwOnMissing) {
      throw new HttpException(
        `validation:error. config error - missing env.${key}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }

    return value;
  }
}

const configService = new ConfigService(process.env);

export { configService };
