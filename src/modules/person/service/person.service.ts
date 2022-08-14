import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PersonDocument, PersonModel } from '../models/person.model';
import { PersonInterface } from '../interfaces/person.interface';
import { createPersonType } from '../types/create-person.type';
import { updatePersonType } from '../types/update-person.type';

@Injectable()
export class PersonService {
  constructor(
    @InjectModel(PersonModel.name)
    private readonly _personModel: Model<PersonDocument>,
  ) {}

  async create(personDataToCreate: createPersonType): Promise<PersonInterface> {
    return this._personModel.create(personDataToCreate);
  }

  async update(
    personId: string,
    personDataToUpdate: updatePersonType,
  ): Promise<PersonInterface> {
    const person = await this._personModel.findOne({ _id: personId });

    if (!person) {
      throw new HttpException('No such person', HttpStatus.NOT_FOUND);
    }

    return this._personModel.findOneAndUpdate(
      {
        _id: personId,
      },
      personDataToUpdate,
      {
        new: true,
      },
    );
  }

  async getOne(personId: string): Promise<PersonInterface> {
    const person = await this._personModel.findOne({ _id: personId });

    if (!person) {
      throw new HttpException('No such person', HttpStatus.NOT_FOUND);
    }

    return this._personModel.findOne({ _id: personId });
  }
}
