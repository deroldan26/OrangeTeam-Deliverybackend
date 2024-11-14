import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCategoryException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}
