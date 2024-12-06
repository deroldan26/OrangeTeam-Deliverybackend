import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCuponValueException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}