import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderCreatedDateException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}