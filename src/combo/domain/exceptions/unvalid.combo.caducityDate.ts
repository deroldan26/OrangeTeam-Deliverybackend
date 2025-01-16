import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboCaducityDateException extends DomainException {
    constructor(message: string){
        super(message);
    }
}