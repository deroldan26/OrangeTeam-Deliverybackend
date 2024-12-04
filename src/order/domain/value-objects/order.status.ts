import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderStatusException } from "../exceptions/unvalid.order.status"

export class OrderStatus implements ValueObject<OrderStatus> {
    constructor(private _status: string) {
        if (_status.length < 3) throw new unvalidOrderStatusException(`Status '${_status}' not valid`)
    }
    get Status() {
        return this._status
    }
    equals(obj?: OrderStatus | undefined): boolean {
        return obj?._status === this._status
    }
}