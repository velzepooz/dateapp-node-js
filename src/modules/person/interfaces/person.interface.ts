import { BaseModelInterface } from '../../../shared/interfaces/base-model.interface';

export interface PersonInterface extends BaseModelInterface {
  name: string;
  info: string;
}
