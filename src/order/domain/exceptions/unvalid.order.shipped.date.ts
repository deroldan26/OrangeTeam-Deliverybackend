import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderShippedDateException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}