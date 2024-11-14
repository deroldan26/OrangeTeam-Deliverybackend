import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCategoryImageException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}