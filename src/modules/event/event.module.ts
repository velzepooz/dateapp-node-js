import { forwardRef, Module } from '@nestjs/common';
import { EventService } from './service/event.service';
import { MongooseModule } from '@nestjs/mongoose';
import { EventModel, EventSchema } from './models/event.model';
import { EventResolver } from './resolvers/event.resolver';
import { PersonModule } from '../person/person.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: EventModel.name, schema: EventSchema }]),
    forwardRef(() => PersonModule),
  ],
  providers: [EventService, EventResolver],
  exports: [EventService],
})
export class EventModule {}
