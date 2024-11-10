import { unvalidCategoryNameException } from "../exceptions/unvalid.category.name"
import { ValueObject } from "src/core/domain/value.object"


export class CategoryName implements ValueObject<CategoryName> {
    constructor(private _name: string) {
        if (_name.length < 2) throw new unvalidCategoryNameException(`Name '${_name}' not valid`)
    }
    get Name() {
        return this._name
    }
    equals(obj?: CategoryName | undefined): boolean {
        return obj?._name === this._name
    }
}