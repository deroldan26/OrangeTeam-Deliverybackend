import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderReceivedDateException } from "../exceptions/unvalid.order.received.date"

export class OrderReceivedDate implements ValueObject<OrderReceivedDate> {
    constructor(private _receivedDate: Date) {
        if (!_receivedDate) throw new unvalidOrderReceivedDateException(`Received date '${_receivedDate}' not valid`)
    }
    get ReceivedDate() {
        return this._receivedDate
    }
    equals(obj?: OrderReceivedDate | undefined): boolean {
        return obj?._receivedDate === this._receivedDate
    }
}