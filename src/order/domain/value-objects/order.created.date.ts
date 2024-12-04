import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderCreatedDateException } from "../exceptions/unvalid.order.created.date"

export class OrderCreatedDate implements ValueObject<OrderCreatedDate> {
    constructor(private _createdDate: Date) {
        if (!_createdDate) throw new unvalidOrderCreatedDateException(`Created date '${_createdDate}' not valid`)
    }
    get CreatedDate() {
        return this._createdDate
    }
    equals(obj?: OrderCreatedDate | undefined): boolean {
        return obj?._createdDate === this._createdDate
    }
}