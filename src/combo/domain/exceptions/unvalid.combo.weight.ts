import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboWeightException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}