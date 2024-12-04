import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderTotalAmountException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}