import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboDescriptionException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}