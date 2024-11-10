import { DomainException } from "src/core/domain/domain.exception";

export class unvalidProductImageException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}