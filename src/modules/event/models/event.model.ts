import { Document, Schema as mongoseSchema } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { EVENT_MODEL_NAME } from '../../../shared/constants/model-names.constant';
import { BaseModel } from '../../../shared/models/base.model';
import { EventInterface } from '../interfaces/event.interface';
import { ObjectId } from '../../../shared/interfaces/base-model.interface';
import { PersonModel } from '../../person/models/person.model';

export type EventDocument = EventModel & Document;

@Schema({ collection: EVENT_MODEL_NAME, timestamps: true, versionKey: false })
export class EventModel extends BaseModel implements EventInterface {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  description: string;

  @Prop({
    required: true,
  })
  datetime: Date;

  @Prop({
    type: mongoseSchema.Types.ObjectId,
    ref: PersonModel.name,
    required: true,
  })
  personId: ObjectId;
}

export const EventSchema = SchemaFactory.createForClass(EventModel);
