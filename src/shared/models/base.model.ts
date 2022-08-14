import {
  BaseModelInterface,
  ObjectId,
} from '../interfaces/base-model.interface';

export class BaseModel implements BaseModelInterface {
  _id: ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
