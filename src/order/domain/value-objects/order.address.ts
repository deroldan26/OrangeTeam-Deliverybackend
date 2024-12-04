import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderAddressException } from "../exceptions/unvalid.order.address"

export class OrderAddress implements ValueObject<OrderAddress> {
    constructor(private _address: string) {
        if (_address.length < 10) throw new unvalidOrderAddressException(`Address '${_address}' not valid`)
    }
    get Address() {
        return this._address
    }
    equals(obj?: OrderAddress | undefined): boolean {
        return obj?._address === this._address
    }
}