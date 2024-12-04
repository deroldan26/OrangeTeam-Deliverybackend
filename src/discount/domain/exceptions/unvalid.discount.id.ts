import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidDiscountIDException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}