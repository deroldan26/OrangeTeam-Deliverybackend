import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderProductQuantityException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}