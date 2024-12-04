import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderCurrencyException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}