import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderCancelledDateException } from "../exceptions/unvalid.order.cancelled.date"

export class OrderCancelledDate implements ValueObject<OrderCancelledDate> {
    constructor(private _cancelledDate: Date) {
        if (!_cancelledDate) throw new unvalidOrderCancelledDateException(`Cancelled date '${_cancelledDate}' not valid`)
    }
    get CancelledDate() {
        return this._cancelledDate
    }
    equals(obj?: OrderCancelledDate | undefined): boolean {
        return obj?._cancelledDate === this._cancelledDate
    }
}