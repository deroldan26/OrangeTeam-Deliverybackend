import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderReportDateException } from "../exceptions/unvalid.order.report.date"

export class OrderReportDate implements ValueObject<OrderReportDate> {
    constructor(private _reportDate: Date) {
        if (!_reportDate) throw new unvalidOrderReportDateException(`Report date '${_reportDate}' not valid`)
    }
    get ReportDate() {
        return this._reportDate
    }
    equals(obj?: OrderReportDate | undefined): boolean {
        return obj?._reportDate === this._reportDate
    }
}