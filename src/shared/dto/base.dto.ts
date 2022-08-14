import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsDate, IsMongoId } from 'class-validator';
import { ObjectId } from '../interfaces/base-model.interface';

@ObjectType('Base')
export class BaseDto {
  @Field(() => ID)
  @IsMongoId()
  _id: ObjectId;

  @Field()
  @IsDate()
  createdAt: Date;

  @Field()
  @IsDate()
  updatedAt: Date;
}
