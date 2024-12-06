import { unvalidCuponDescriptionException } from "../exceptions/unvalid.cupon.description"
import { ValueObject } from "../../../core/domain/value.object"


export class CuponDescription implements ValueObject<CuponDescription> {
    constructor(private _description: string) {
        if (_description.length < 2) throw new unvalidCuponDescriptionException(`Description '${_description}' not valid`)
    }
    get Description() {
        return this._description
    }
    equals(obj?: CuponDescription | undefined): boolean {
        return obj?._description === this._description
    }
}