import { unvalidUserEmailException } from "../exceptions/unvalid.user.email"
import { ValueObject } from "../../../core/domain/value.object"


export class UserEmail implements ValueObject<UserEmail> {
    constructor(private _email: string) {
        if (_email.length < 2) throw new unvalidUserEmailException(`Email '${_email}' not valid`)
    }
    get Email() {
        return this._email
    }
    equals(obj?: UserEmail | undefined): boolean {
        return obj?._email === this._email
    }
}