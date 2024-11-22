import { unvalidUserUsernameException } from "../exceptions/unvalid.user.username"
import { ValueObject } from "../../../core/domain/value.object"


export class UserUsername implements ValueObject<UserUsername> {
    constructor(private _username: string) {
        if (_username.length < 2) throw new unvalidUserUsernameException(`Username '${_username}' not valid`)
    }
    get Username() {
        return this._username
    }
    equals(obj?: UserUsername | undefined): boolean {
        return obj?._username === this._username
    }
}