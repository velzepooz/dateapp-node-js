import { ObjectId } from '../../../shared/interfaces/base-model.interface';

export type createEventType = {
  name: string;
  description: string;
  datetime: Date;
  personId: ObjectId;
};
