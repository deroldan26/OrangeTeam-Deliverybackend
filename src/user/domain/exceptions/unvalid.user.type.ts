import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserTypeException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}