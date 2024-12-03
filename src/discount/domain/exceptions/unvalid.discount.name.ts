import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidDiscountNameException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}