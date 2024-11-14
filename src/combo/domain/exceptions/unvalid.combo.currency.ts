import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboCurrencyException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}