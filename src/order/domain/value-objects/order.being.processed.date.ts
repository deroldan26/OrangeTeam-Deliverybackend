import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderBeingProcessedDateException } from "../exceptions/unvalid.order.being.processed.date"

export class OrderBeingProcessedDate implements ValueObject<OrderBeingProcessedDate> {
    constructor(private _beingProcessedDate: Date) {
        if (!_beingProcessedDate) throw new unvalidOrderBeingProcessedDateException(`Being processed date '${_beingProcessedDate}' not valid`)
    }
    get BeingProcessedDate() {
        return this._beingProcessedDate
    }
    equals(obj?: OrderBeingProcessedDate | undefined): boolean {
        return obj?._beingProcessedDate === this._beingProcessedDate
    }
}