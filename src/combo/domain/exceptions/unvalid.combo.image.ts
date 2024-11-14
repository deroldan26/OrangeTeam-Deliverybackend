import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboImageException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}