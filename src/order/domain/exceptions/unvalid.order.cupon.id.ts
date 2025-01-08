import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidOrderCuponIdException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}