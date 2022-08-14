import { Model } from 'mongoose';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { EventDocument, EventModel } from '../models/event.model';
import { EventInterface } from '../interfaces/event.interface';
import { createEventType } from '../types/create-event.type';
import { updateEventType } from '../types/update-event.type';

@Injectable()
export class EventService {
  constructor(
    @InjectModel(EventModel.name)
    private readonly _eventModel: Model<EventDocument>,
  ) {}

  async create(eventData: createEventType): Promise<EventInterface> {
    return this._eventModel.create(eventData);
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
}
