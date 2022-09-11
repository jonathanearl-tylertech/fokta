import { Injectable } from "@nestjs/common";
import {
  ValidationArguments,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from "class-validator";

@ValidatorConstraint({ name: "ContainsRule", async: false })
@Injectable()
export class ContainsRule implements ValidatorConstraintInterface {
  validate(value: any, args: ValidationArguments) {
    if (Array.isArray(value)) {
      for (const v of value) {
        if (!args.constraints.includes(v)) return false;
      }
      return true;
    } else {
      return args.constraints.includes(value);
    }
  }

  defaultMessage(args: ValidationArguments) {
    return `${args.property} must be ${args.constraints.join(",")}`;
  }
}
