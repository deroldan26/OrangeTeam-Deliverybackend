import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserEmailException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}