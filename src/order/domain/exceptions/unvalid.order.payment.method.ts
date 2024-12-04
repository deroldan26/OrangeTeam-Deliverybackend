import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderPaymentMethodException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}