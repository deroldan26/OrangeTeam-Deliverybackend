import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserPhoneException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}