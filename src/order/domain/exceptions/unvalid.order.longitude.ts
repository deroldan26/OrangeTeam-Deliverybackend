import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderLongitudeException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}