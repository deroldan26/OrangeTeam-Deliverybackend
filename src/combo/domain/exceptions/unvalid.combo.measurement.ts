import { DomainException } from "../../../core/domain/domain.exception";

export class unvalidComboMeasurementException extends DomainException{
    constructor(message: string){
        super(message);
    }
}