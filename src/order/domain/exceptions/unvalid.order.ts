import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}