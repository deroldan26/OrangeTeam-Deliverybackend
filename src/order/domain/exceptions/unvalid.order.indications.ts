import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderIndicationsException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}