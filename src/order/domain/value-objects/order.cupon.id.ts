import { ValueObject } from "../../../core/domain/value.object"
import { regExpUUID } from "../../../core/tools/regexp.uuid"
import { unvalidOrderCuponIdException } from "../exceptions/unvalid.order.cupon.id"


export class OrderCuponID implements ValueObject<OrderCuponID> {
    constructor(private _cupon: string) {
        if (_cupon.length < 4) throw new unvalidOrderCuponIdException(`Cupon '${_cupon}' not valid`)
    }
    get CuponId() {
        return this._cupon
    }
    equals(obj?: OrderCuponID | undefined): boolean {
        return obj?._cupon === this._cupon
    }
}