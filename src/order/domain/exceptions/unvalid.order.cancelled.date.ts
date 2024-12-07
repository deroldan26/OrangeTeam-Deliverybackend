import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderCancelledDateException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}