import { ValueObject } from "../../../core/domain/value.object"
import { unvalidOrderPaymentMethodException } from "../exceptions/unvalid.order.payment.method"

export class OrderPaymentMethod implements ValueObject<OrderPaymentMethod> {
    constructor(private _paymentMethod: string) {
        if (_paymentMethod.length < 10) throw new unvalidOrderPaymentMethodException(`Payment Method '${_paymentMethod}' not valid`)
    }
    get PaymentMethod() {
        return this._paymentMethod
    }
    equals(obj?: OrderPaymentMethod | undefined): boolean {
        return obj?._paymentMethod === this._paymentMethod
    }
}