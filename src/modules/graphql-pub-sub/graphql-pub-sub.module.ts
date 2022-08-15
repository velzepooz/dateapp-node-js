import { RedisPubSub } from 'graphql-redis-subscriptions';
import { Global, Module } from '@nestjs/common';
import { configService } from '../../shared/config/config.service';

export const PUB_SUB = 'PUB_SUB';

@Global()
@Module({
  imports: [],
  providers: [
    {
      provide: PUB_SUB,
      useFactory: () =>
        new RedisPubSub(configService.getGraphQlPubSubOptions()),
      inject: [],
    },
  ],
  exports: [PUB_SUB],
})
export class GraphQLPubSubModule {}
