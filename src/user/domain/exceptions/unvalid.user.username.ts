import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserUsernameException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}