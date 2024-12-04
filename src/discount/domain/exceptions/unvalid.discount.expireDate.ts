import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidDiscountExpireDateException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}