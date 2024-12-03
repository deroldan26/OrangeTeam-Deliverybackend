import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidDiscountInitDateException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}