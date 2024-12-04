import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidOrderIdException } from "../exceptions/unvalid.order.id"


export class OrderID implements ValueObject<OrderID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidOrderIdException(`Order Id '${_id}' not valid`)
    }
    get Id() {
        return this._id
    }
    equals(obj?: OrderID | undefined): boolean {
        return obj?._id === this._id
    }
}