import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidDiscountException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}