import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidUserImageException extends DomainException {
    constructor (message: string) {
        super(message);
    }
}