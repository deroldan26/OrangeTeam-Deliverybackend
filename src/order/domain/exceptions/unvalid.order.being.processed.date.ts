import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderBeingProcessedDateException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}