import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidProductCurrencyException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}