import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderAddressException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}