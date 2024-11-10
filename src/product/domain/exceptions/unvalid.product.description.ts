import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidProductDescriptionException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}