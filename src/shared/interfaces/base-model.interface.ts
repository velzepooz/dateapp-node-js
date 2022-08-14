import { Types } from 'mongoose';

export type ObjectId = Types.ObjectId;

export interface BaseModelInterface {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
