import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderShippedDateException } from "../exceptions/unvalid.order.shipped.date"

export class OrderShippedDate implements ValueObject<OrderShippedDate> {
    constructor(private _shippedDate: Date) {
        if (!_shippedDate) throw new unvalidOrderShippedDateException(`Shipped date '${_shippedDate}' not valid`)
    }
    get ShippedDate() {
        return this._shippedDate
    }
    equals(obj?: OrderShippedDate | undefined): boolean {
        return obj?._shippedDate === this._shippedDate
    }
}