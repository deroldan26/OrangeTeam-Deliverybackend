import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderReportDateException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}