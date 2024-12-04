import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderLatitudeException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}