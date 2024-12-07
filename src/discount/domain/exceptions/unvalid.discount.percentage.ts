import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidDiscountPercentageException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}