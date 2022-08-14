import { Module } from '@nestjs/common';
import { EventService } from './service/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel, EventSchema } from './models/event.model';
import { EventResolver } from './resolvers/event.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EventModel.name, schema: EventSchema }]),
  ],
  providers: [EventService, EventResolver],
})
export class EventModule {}
