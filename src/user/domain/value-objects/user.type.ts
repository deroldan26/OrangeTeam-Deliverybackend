import { unvalidUserTypeException } from "../exceptions/unvalid.user.type"
import { ValueObject } from "../../../core/domain/value.object"


export class UserType implements ValueObject<UserType> {
    constructor(private _type: string) {
        if (_type.length < 2) throw new unvalidUserTypeException(`Type '${_type}' not valid`)
    }
    get Type() {
        return this._type
    }
    equals(obj?: UserType | undefined): boolean {
        return obj?._type === this._type
    }
}