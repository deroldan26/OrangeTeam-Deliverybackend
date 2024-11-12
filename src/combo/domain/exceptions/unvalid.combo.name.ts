import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboNameException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}