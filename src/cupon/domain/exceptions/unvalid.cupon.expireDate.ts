import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCuponExpireDateException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}