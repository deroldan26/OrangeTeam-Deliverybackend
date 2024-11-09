import { ValueObject } from "src/core/domain/value.object"
import { unvalidProductDescriptionException } from "../exceptions/unvalid.product.description"


export class ProductDescription implements ValueObject<ProductDescription> {
    constructor(private _description: string) {
        if (_description.length < 10) throw new unvalidProductDescriptionException(`Description '${_description}' not valid`)
    }
    get Description() {
        return this._description
    }
    equals(obj?: ProductDescription | undefined): boolean {
        return obj?._description === this._description
    }
}