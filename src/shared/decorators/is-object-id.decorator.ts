import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { Types } from 'mongoose';

export function IsObjectId(validationOptions?: ValidationOptions) {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: IsObjectIdConstraint,
    });
  };
}

@ValidatorConstraint({ name: 'IsObjectIdConstraint' })
export class IsObjectIdConstraint implements ValidatorConstraintInterface {
  validate(value: string): boolean {
    if (!value) return false;
    return Types.ObjectId.isValid(value);
  }

  defaultMessage(args: ValidationArguments): string {
    return `${args.value} is not Mongo id`;
  }
}
