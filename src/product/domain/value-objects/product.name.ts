import { unvalidProductNameException } from "../exceptions/unvalid.product.name"
import { ValueObject } from "src/core/domain/value.object"


export class ProductName implements ValueObject<ProductName> {
    constructor(private _name: string) {
        if (_name.length < 6) throw new unvalidProductNameException(`Name '${_name}' not valid`)
    }
    get Name() {
        return this._name
    }
    equals(obj?: ProductName | undefined): boolean {
        return obj?._name === this._name
    }
}