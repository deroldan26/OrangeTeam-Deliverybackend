import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidOrderIdException } from "../exceptions/unvalid.order.id"


export class OrderReportID implements ValueObject<OrderReportID> {
    constructor(private _id: string) {
        if (!regExpUUID.test(_id)) throw new unvalidOrderIdException(`Report Id '${_id}' not valid`)
    }
    get ReportId() {
        return this._id
    }
    equals(obj?: OrderReportID | undefined): boolean {
        return obj?._id === this._id
    }
}