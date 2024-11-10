import { DomainException } from "src/core/domain/domain.exception";

export class unvalidCategoryNameException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}