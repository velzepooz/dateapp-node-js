import { Model } from 'mongoose';
import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument, EventModel } from '../models/event.model';
import { EventInterface } from '../interfaces/event.interface';
import { createEventType } from '../types/create-event.type';
import { updateEventType } from '../types/update-event.type';
import { ObjectId } from '../../../shared/interfaces/base-model.interface';
import { PUB_SUB } from '../../graphql-pub-sub/graphql-pub-sub.module';
import { RedisPubSub } from 'graphql-redis-subscriptions';
import { EventSubscriptionEnum } from '../enum/event-subscription.enum';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventModel.name)
    private readonly _eventModel: Model<EventDocument>,
    @Inject(PUB_SUB) private _pubSubService: RedisPubSub,
  ) {}

  async create(eventData: createEventType): Promise<EventInterface> {
    const event = await this._eventModel.create(eventData);

    await this._pubSubService.publish(
      EventSubscriptionEnum.EVENT_CREATED,
      event,
    );

    return event;
  }

  async update(
    eventId: string,
    eventUpdateData: updateEventType,
  ): Promise<EventInterface> {
    const event = await this._eventModel.findOne({ _id: eventId }).lean();

    if (!event) {
      throw new HttpException('No such event', HttpStatus.NOT_FOUND);
    }

    return this._eventModel
      .findOneAndUpdate(
        {
          _id: eventId,
        },
        eventUpdateData,
        { new: true },
      )
      .lean();
  }

  async getById(eventId: string): Promise<EventInterface> {
    const event = await this._eventModel.findOne({ _id: eventId }).lean();

    if (!event) {
      throw new HttpException('No such event', HttpStatus.NOT_FOUND);
    }

    return this._eventModel.findOne({ _id: eventId }).lean();
  }

  async getAll(): Promise<EventInterface[]> {
    return this._eventModel.find();
  }

  async deleteEvent(eventId: string): Promise<boolean> {
    await this._eventModel.remove({ _id: eventId });
    return true;
  }

  async getEventsByParentId(personId: ObjectId): Promise<EventInterface[]> {
    return this._eventModel.find({ personId });
  }
}
