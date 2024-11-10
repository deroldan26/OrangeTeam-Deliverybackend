import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidProductException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}