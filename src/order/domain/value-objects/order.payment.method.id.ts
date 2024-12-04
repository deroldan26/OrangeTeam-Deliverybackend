import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidOrderIdException } from "../exceptions/unvalid.order.id"


export class OrderPaymentMethodID implements ValueObject<OrderPaymentMethodID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidOrderIdException(`Payment Method Id '${_id}' not valid`)
    }
    get PaymentMethodId() {
        return this._id
    }
    equals(obj?: OrderPaymentMethodID | undefined): boolean {
        return obj?._id === this._id
    }
}