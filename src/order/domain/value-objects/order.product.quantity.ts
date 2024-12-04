import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderProductQuantityException } from "../exceptions/unvalid.order.product.quantity"

export class OrderProductQuantity implements ValueObject<OrderProductQuantity> {
    constructor(private _quantity: number) {
        if (_quantity < 0) throw new unvalidOrderProductQuantityException(`Quantity '${_quantity}' not valid`)
    }
    get ProductQuantity() {
        return this._quantity
    }
    equals(obj?: OrderProductQuantity | undefined): boolean {
        return obj?._quantity === this._quantity
    }
}