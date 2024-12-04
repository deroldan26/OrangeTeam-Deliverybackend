import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}