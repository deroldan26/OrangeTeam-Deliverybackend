import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCuponIDException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}