import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidOrderIdException } from "../exceptions/unvalid.order.id"


export class OrderProductID implements ValueObject<OrderProductID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidOrderIdException(`Product Id '${_id}' not valid`)
    }
    get ProductId() {
        return this._id
    }
    equals(obj?: OrderProductID | undefined): boolean {
        return obj?._id === this._id
    }
}