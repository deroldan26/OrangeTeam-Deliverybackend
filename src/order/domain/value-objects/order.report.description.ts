import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderTotalAmountException } from "../exceptions/unvalid.order.total.amount"

export class OrderReportDescription implements ValueObject<OrderReportDescription> {
    constructor(private _description: string) {
        if (_description.length < 0) throw new unvalidOrderTotalAmountException(`Report Description '${_description}' not valid`)
    }
    get ReportDescription() {
        return this._description
    }
    equals(obj?: OrderReportDescription | undefined): boolean {
        return obj?._description === this._description
    }
}