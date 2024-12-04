import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderCurrencyException } from "../exceptions/unvalid.order.currency"


export class OrderCurrency implements ValueObject<OrderCurrency> {
    constructor(private _currency: string) {
        if (_currency.length != 3 ) throw new unvalidOrderCurrencyException(`Currency '${_currency}' not valid`)
    }
    get Currency() {
        return this._currency
    }
    equals(obj?: OrderCurrency | undefined): boolean {
        return obj?._currency === this._currency
    }
}