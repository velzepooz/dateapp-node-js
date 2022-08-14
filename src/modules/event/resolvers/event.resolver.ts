import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { EventDto } from '../dto/event.dto';
import { EventService } from '../service/event.service';
import { CreateEventInput } from '../dto/inputs/create-event.input';
import { UsePipes, ValidationPipe } from '@nestjs/common';
import { configService } from '../../../shared/config/config.service';
import { UpdateEventInput } from '../dto/inputs/update-event.input';

@Resolver(() => EventDto)
export class EventResolver {
  constructor(private readonly _eventService: EventService) {}

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
}
