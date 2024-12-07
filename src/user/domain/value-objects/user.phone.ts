import { unvalidUserPhoneException } from "../exceptions/unvalid.user.phone"
import { ValueObject } from "../../../core/domain/value.object"


export class UserPhone implements ValueObject<UserPhone> {
    constructor(private _phone: string) {
        if (_phone.length < 2) throw new unvalidUserPhoneException(`Phone '${_phone}' not valid`)
    }
    get Phone() {
        return this._phone
    }
    equals(obj?: UserPhone | undefined): boolean {
        return obj?._phone === this._phone
    }
}