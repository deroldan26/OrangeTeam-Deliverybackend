import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderIdException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}