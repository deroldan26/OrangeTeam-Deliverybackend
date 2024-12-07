import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidCuponDescriptionException extends DomainException {
  constructor(message: string) {
    super(message);
  }
}