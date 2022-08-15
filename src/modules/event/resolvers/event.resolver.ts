import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
  Subscription,
} from '@nestjs/graphql';
import { EventDto } from '../dto/event.dto';
import { EventService } from '../service/event.service';
import { CreateEventInput } from '../dto/inputs/create-event.input';
import { Inject, UsePipes, ValidationPipe } from '@nestjs/common';
import { configService } from '../../../shared/config/config.service';
import { UpdateEventInput } from '../dto/inputs/update-event.input';
import { PersonDto } from '../../person/dto/person.dto';
import { PersonService } from '../../person/service/person.service';
import { PUB_SUB } from '../../graphql-pub-sub/graphql-pub-sub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { EventSubscriptionEnum } from '../enum/event-subscription.enum';
import { eventCreatedSubscriptionFilter } from '../utils/subscription-filters.util';
import { generalResolver } from '../utils/subscription-resolver.util';

@Resolver(() => EventDto)
export class EventResolver {
  constructor(
    @Inject(PUB_SUB) private readonly _pubSubService: RedisPubSub,
    private readonly _eventService: EventService,
    private readonly _personService: PersonService,
  ) {}

  @Subscription(() => EventDto, {
    filter: eventCreatedSubscriptionFilter,
    resolve: generalResolver,
  })
  eventCreated(@Args('personId', { nullable: true }) personId: string) {
    return this._pubSubService.asyncIterator(
      EventSubscriptionEnum.EVENT_CREATED,
    );
  }

  @UsePipes(new ValidationPipe(configService.getValidationOptions(true)))
  @Query(() => EventDto)
  async getEventById(@Args('id') id: string): Promise<EventDto> {
    return this._eventService.getById(id);
  }

  @Query(() => [EventDto])
  async getAllEvents(): Promise<EventDto[]> {
    return this._eventService.getAll();
  }

  @UsePipes(new ValidationPipe(configService.getValidationOptions(true)))
  @Mutation(() => EventDto)
  async createEvent(
    @Args('createEventData') createEventData: CreateEventInput,
  ): Promise<EventDto> {
    return this._eventService.create(createEventData);
  }

  @UsePipes(new ValidationPipe(configService.getValidationOptions(true)))
  @Mutation(() => EventDto)
  async updateEvent(
    @Args('id') id: string,
    @Args('updateEventData') updateEventData: UpdateEventInput,
  ): Promise<EventDto> {
    return this._eventService.update(id, updateEventData);
  }

  @Mutation(() => Boolean)
  async deleteEvent(@Args('id') id: string): Promise<boolean> {
    return this._eventService.deleteEvent(id);
  }

  @ResolveField(() => PersonDto)
  async person(@Parent() { personId }: EventDto): Promise<PersonDto> {
    return this._personService.getById(personId.toString());
  }
}
