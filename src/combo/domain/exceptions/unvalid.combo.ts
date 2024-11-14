import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
