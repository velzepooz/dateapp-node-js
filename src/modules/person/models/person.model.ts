import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { PersonInterface } from '../interfaces/person.interface';
import { BaseModel } from '../../../shared/models/base.model';
import { PERSON_MODEL_NAME } from '../../../shared/constants/model-names.constant';

export type PersonDocument = PersonModel & Document;

@Schema({ collection: PERSON_MODEL_NAME, timestamps: true, versionKey: false })
export class PersonModel extends BaseModel implements PersonInterface {
  @Prop({
    required: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    trim: true,
  })
  info: string;
}

export const PersonSchema = SchemaFactory.createForClass(PersonModel);
