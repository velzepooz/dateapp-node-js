import { PersonService } from '../service/person.service';
import { PersonDto } from '../dto/person.dto';
import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { configService } from '../../../shared/config/config.service';
import { CreatePersonInput } from '../dto/inputs/create-person.input';
import { UpdatePersonInput } from '../dto/inputs/update-person.input';
import { EventDto } from '../../event/dto/event.dto';
import { EventService } from '../../event/service/event.service';

@Resolver(() => PersonDto)
export class PersonResolver {
  constructor(
    private readonly _personService: PersonService,
    private readonly _eventService: EventService,
  ) {}

  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  @Query(() => PersonDto)
  async getPerson(@Args('id') id: string): Promise<PersonDto> {
    return this._personService.getById(id);
  }

  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  @Mutation(() => PersonDto)
  async createPerson(
    @Args('createPersonData') createPersonData: CreatePersonInput,
  ): Promise<PersonDto> {
    return this._personService.create(createPersonData);
  }

  @UsePipes(new ValidationPipe(configService.getValidationOptions()))
  @Mutation(() => PersonDto)
  async updatePerson(
    @Args('id') id: string,
    @Args('updatePersonData') updatePersonData: UpdatePersonInput,
  ): Promise<PersonDto> {
    return this._personService.update(id, updatePersonData);
  }

  @ResolveField(() => [EventDto])
  async events(@Parent() { _id }: PersonDto): Promise<EventDto[]> {
    return this._eventService.getEventsByParentId(_id);
  }
}
