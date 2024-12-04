import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderReceivedDateException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}