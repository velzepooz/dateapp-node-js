import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './service/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel, EventSchema } from './models/event.model';
import { EventResolver } from './resolvers/event.resolver';
import { PersonModule } from '../person/person.module';
import { GraphQLPubSubModule } from '../graphql-pub-sub/graphql-pub-sub.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EventModel.name, schema: EventSchema }]),
    forwardRef(() => PersonModule),
    GraphQLPubSubModule,
  ],
  providers: [EventService, EventResolver],
  exports: [EventService],
})
export class EventModule {}
