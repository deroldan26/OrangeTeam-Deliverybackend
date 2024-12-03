import { unvalidUserNameException } from "../exceptions/unvalid.user.name"
import { ValueObject } from "../../../core/domain/value.object"


export class UserName implements ValueObject<UserName> {
    constructor(private _name: string) {
        if (_name.length < 2) throw new unvalidUserNameException(`Username '${_name}' not valid`)
    }
    get Name() {
        return this._name
    }
    equals(obj?: UserName | undefined): boolean {
        return obj?._name === this._name
    }
}