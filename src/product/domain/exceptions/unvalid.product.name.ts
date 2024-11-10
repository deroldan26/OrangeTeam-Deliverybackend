import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidProductNameException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}