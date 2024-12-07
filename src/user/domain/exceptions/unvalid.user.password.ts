import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserPasswordException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}