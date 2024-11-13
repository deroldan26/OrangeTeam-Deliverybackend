import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidProductStockException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}