import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ApolloDriverConfig } from '@nestjs/apollo';
import { GraphQLModule } from '@nestjs/graphql';
import { PersonModule } from './modules/person/person.module';
import { configService } from './shared/config/config.service';
import { EventModule } from './modules/event/event.module';

@Module({
  imports: [
    MongooseModule.forRoot(configService.getMongoDbConfig()),
    GraphQLModule.forRoot<ApolloDriverConfig>(
      configService.getGraphQLModuleConfig(),
    ),
    PersonModule,
    EventModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
