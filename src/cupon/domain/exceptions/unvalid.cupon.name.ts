import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCuponNameException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}