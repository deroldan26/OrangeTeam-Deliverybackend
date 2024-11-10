import { DomainException } from "src/core/domain/domain.exception";

export class unvalidCategoryIdException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}