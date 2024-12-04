import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderStatusException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}