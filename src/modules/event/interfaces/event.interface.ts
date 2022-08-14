import {
  BaseModelInterface,
  ObjectId,
} from '../../../shared/interfaces/base-model.interface';

export interface EventInterface extends BaseModelInterface {
  name: string;
  description: string;
  datetime: Date;
  personId: ObjectId;
}
