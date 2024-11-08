import { DomainException } from "src/core/domain/domain.exception";

export class unvalidProductPriceException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}