import { unvalidCuponNameException } from "../exceptions/unvalid.cupon.name"
import { ValueObject } from "../../../core/domain/value.object"


export class CuponName implements ValueObject<CuponName> {
    constructor(private _name: string) {
        if (_name.length < 2) throw new unvalidCuponNameException(`Name '${_name}' not valid`)
    }
    get Name() {
        return this._name
    }
    equals(obj?: CuponName | undefined): boolean {
        return obj?._name === this._name
    }
}