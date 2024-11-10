import { ValueObject } from "../../../core/domain/value.object"
import { unvalidProductCurrencyException } from "../exceptions/unvalid.product.currency"


export class ProductCurrency implements ValueObject<ProductCurrency> {
    constructor(private _currency: string) {
        if (_currency.length != 3 ) throw new unvalidProductCurrencyException(`Currency '${_currency}' not valid`)
    }
    get Currency() {
        return this._currency
    }
    equals(obj?: ProductCurrency | undefined): boolean {
        return obj?._currency === this._currency
    }
}