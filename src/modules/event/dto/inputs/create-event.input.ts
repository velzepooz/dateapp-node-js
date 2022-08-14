import { InputType, PickType } from '@nestjs/graphql';
import { EventInput } from '../event.dto';

@InputType()
export class CreateEventInput extends PickType(EventInput, [
  'name',
  'description',
  'datetime',
  'personId',
]) {}
