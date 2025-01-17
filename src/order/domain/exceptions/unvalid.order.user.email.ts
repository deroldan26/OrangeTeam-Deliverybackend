import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderUserEmailException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}