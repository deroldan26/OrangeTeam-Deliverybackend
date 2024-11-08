import { DomainException } from "src/core/domain/domain.exception";

export class unvalidProductIdException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}