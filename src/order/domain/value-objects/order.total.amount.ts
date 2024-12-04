import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderTotalAmountException } from "../exceptions/unvalid.order.total.amount"

export class OrderTotalAmount implements ValueObject<OrderTotalAmount> {
    constructor(private _totalAmount: number) {
        if (_totalAmount < 0) throw new unvalidOrderTotalAmountException(`Total amount '${_totalAmount}' not valid`)
    }
    get TotalAmount() {
        return this._totalAmount
    }
    equals(obj?: OrderTotalAmount | undefined): boolean {
        return obj?._totalAmount === this._totalAmount
    }
}