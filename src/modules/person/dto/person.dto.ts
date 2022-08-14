import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString } from 'class-validator';
import { PersonInterface } from '../interfaces/person.interface';
import { BaseDto } from '../../../shared/dto/base.dto';
import { PERSON_MODEL_NAME } from '../../../shared/constants/model-names.constant';

@ObjectType(PERSON_MODEL_NAME)
export class PersonDto extends BaseDto implements PersonInterface {
  @Field()
  @IsString()
  name: string;

  @Field()
  @IsString()
  info: string;
}

@InputType()
export class PersonInput extends PersonDto {}
