import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderReportDescriptionException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}