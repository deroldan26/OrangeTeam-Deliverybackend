import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidProductWeightException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}