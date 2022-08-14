import { InputType, PickType } from '@nestjs/graphql';
import { PersonInput } from '../person.dto';

@InputType()
export class CreatePersonInput extends PickType(PersonInput, [
  'name',
  'info',
]) {}
