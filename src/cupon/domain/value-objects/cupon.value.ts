import { unvalidCuponValueException } from "../exceptions/unvalid.cupon.value"
import { ValueObject } from "../../../core/domain/value.object"


export class CuponValue implements ValueObject<CuponValue> {
    constructor(private _value: number) {
        if (_value < 0) throw new unvalidCuponValueException(`Value '${_value}' not valid`)
    }
    get Value() {
        return this._value
    }
    equals(obj?: CuponValue | undefined): boolean {
        return obj?._value === this._value
    }
}