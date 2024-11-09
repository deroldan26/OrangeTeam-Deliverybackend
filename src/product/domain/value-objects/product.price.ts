import { ValueObject } from "src/core/domain/value.object"
import { unvalidProductPriceException } from "../exceptions/unvalid.product.price"


export class ProductPrice implements ValueObject<ProductPrice> {
    constructor(private _price: number) {
        if (_price < 0) throw new unvalidProductPriceException(`Price '${_price}' not valid`)
    }
    get Price() {
        return this._price
    }
    equals(obj?: ProductPrice | undefined): boolean {
        return obj?._price === this._price
    }
}