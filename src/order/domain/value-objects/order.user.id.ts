import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidOrderUserIdException } from "../exceptions/unvalid.order.user.id"


export class OrderUserID implements ValueObject<OrderUserID> {
    constructor(private _userid: string) {
        if (!regExpUUID.test(_userid)) throw new unvalidOrderUserIdException(`Order user Id '${_userid}' not valid`)
    }
    get UserId() {
        return this._userid
    }
    equals(obj?: OrderUserID | undefined): boolean {
        return obj?._userid === this._userid
    }
}