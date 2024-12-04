import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidOrderIdException } from "../exceptions/unvalid.order.id"


export class OrderComboID implements ValueObject<OrderComboID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidOrderIdException(`Combo Id '${_id}' not valid`)
    }
    get ComboId() {
        return this._id
    }
    equals(obj?: OrderComboID | undefined): boolean {
        return obj?._id === this._id
    }
}