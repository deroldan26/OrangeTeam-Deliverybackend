import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboSpecialPriceException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}