import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderUserIdException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}