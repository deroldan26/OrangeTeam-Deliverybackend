import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCategoryIDException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}