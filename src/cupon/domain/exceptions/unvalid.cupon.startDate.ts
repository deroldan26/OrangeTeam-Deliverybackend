import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCuponStartDateException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}