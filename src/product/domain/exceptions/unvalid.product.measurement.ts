import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidProductMeasurementException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}