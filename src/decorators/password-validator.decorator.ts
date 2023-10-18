import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from 'class-validator';
const upperCase = /[A-Z]/;
const lowerCase = /[a-z]/;
const special = /[!@#\$%\^&\*]/;
const numbers = /[0-9]/;

@ValidatorConstraint({ async: false })
export class PasswordValidation implements ValidatorConstraintInterface {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  validate(password: string, args: ValidationArguments) {
    if (!upperCase.test(password) || !lowerCase.test(password) || !special.test(password) || !numbers.test(password)) {
      return false;
    }
    return true;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  defaultMessage(args: ValidationArguments) {
    return 'Password must contain at least one uppercase, one lowercase, one special and one number character';
  }
}

export function IsPassword(validationOptions?: ValidationOptions) {
  // eslint-disable-next-line @typescript-eslint/ban-types
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: PasswordValidation,
    });
  };
}
