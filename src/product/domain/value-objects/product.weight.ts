import { ValueObject } from "src/core/domain/value.object"
import { unvalidProductWeightException } from "../exceptions/unvalid.product.weight"


export class ProductWeight implements ValueObject<ProductWeight> {
    constructor(private _weight: string) {
        if (_weight.length < 3) throw new unvalidProductWeightException(`Weight '${_weight}' not valid`)
    }
    get Weight() {
        return this._weight
    }
    equals(obj?: ProductWeight | undefined): boolean {
        return obj?._weight === this._weight
    }
}