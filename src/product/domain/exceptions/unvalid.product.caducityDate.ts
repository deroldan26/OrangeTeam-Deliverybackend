import { DomainException } from "src/core/domain/domain.exception";

export class unvalidProductCaducityDateException extends DomainException {
    constructor(message: string){
        super(message);
    }
}