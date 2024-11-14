import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboIDException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}