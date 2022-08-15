import {
  EVENT_CLIENT,
  EVENT_NOTIFICATION_SUBSCRIBER,
  GRAPHQL_PUB_SUB_CLIENT,
} from '../constants/redis.constant';
import dotenv from 'dotenv';

dotenv.config({ path: `.${process.env.NODE_ENV || 'development'}.env` });

export const redisConfig = {
  development: [
    {
      namespace: EVENT_CLIENT.name,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      db: EVENT_CLIENT.db,
    },
    {
      name: EVENT_NOTIFICATION_SUBSCRIBER.name,
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      db: EVENT_NOTIFICATION_SUBSCRIBER.db,
    },
  ],
};

export const graphQlRedisPubSubConfig = {
  development: {
    namespace: GRAPHQL_PUB_SUB_CLIENT.name,
    host: process.env.REDIS_HOST,
    port: +process.env.REDIS_PORT,
    db: GRAPHQL_PUB_SUB_CLIENT.db,
  },
};
