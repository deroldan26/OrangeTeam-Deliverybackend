import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderUserEmailException } from "../exceptions/unvalid.order.user.email"


export class OrderUserEmail implements ValueObject<OrderUserEmail> {
    constructor(private _email: string) {
        if (_email.length < 2) throw new unvalidOrderUserEmailException(`Email '${_email}' not valid`)
    }
    get Email() {
        return this._email
    }
    equals(obj?: OrderUserEmail | undefined): boolean {
        return obj?._email === this._email
    }
}