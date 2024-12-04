import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderComboQuantityException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}