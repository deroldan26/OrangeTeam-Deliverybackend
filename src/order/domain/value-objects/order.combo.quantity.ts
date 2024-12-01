import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderComboQuantityException } from "../exceptions/unvalid.order.combo.quantity"

export class OrderComboQuantity implements ValueObject<OrderComboQuantity> {
    constructor(private _quantity: number) {
        if (_quantity < 0) throw new unvalidOrderComboQuantityException(`Quantity '${_quantity}' not valid`)
    }
    get ProductQuantity() {
        return this._quantity
    }
    equals(obj?: OrderComboQuantity | undefined): boolean {
        return obj?._quantity === this._quantity
    }
}