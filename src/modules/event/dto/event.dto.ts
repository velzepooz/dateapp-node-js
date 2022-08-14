import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import { Types } from 'mongoose';
import { EVENT_MODEL_NAME } from '../../../shared/constants/model-names.constant';
import { BaseDto } from '../../../shared/dto/base.dto';
import { EventInterface } from '../interfaces/event.interface';
import { IsDate, IsString } from 'class-validator';
import { ObjectId } from '../../../shared/interfaces/base-model.interface';
import { Transform } from 'class-transformer';
import { IsObjectId } from '../../../shared/decorators/is-object-id.decorator';

@ObjectType(EVENT_MODEL_NAME)
export class EventDto extends BaseDto implements EventInterface {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  description: string;

  @Field()
  @IsDate()
  datetime: Date;

  @Field(() => ID)
  @IsObjectId()
  @Transform(({ value }) => new Types.ObjectId(value))
  personId: ObjectId;
}

@InputType()
export class EventInput extends EventDto {}
