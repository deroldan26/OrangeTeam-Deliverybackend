import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserNameException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}