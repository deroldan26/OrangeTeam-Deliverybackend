import { unvalidUserPasswordException } from "../exceptions/unvalid.user.password"
import { ValueObject } from "../../../core/domain/value.object"


export class UserPassword implements ValueObject<UserPassword> {
    constructor(private _password: string) {
        if (_password.length < 2) throw new unvalidUserPasswordException(`Password '${_password}' not valid`)
    }
    get Password() {
        return this._password
    }
    equals(obj?: UserPassword | undefined): boolean {
        return obj?._password === this._password
    }
}