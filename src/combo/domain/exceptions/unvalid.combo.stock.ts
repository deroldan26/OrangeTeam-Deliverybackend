import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboStockException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}