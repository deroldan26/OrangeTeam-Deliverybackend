import { Entity } from "../../../../src/core/domain/entity";
import { OrderPaymentMethodID } from "../value-objects/order.payment.method.id";
import { OrderPaymentMethod } from "../value-objects/order.payment.method";
import { OrderCurrency } from "../value-objects/order.currency";
import { OrderTotalAmount } from "../value-objects/order.total.amount";

export class PaymentMethod extends Entity<OrderPaymentMethodID>{

    constructor(id: OrderPaymentMethodID, private paymentMethod: OrderPaymentMethod, private currency: OrderCurrency, private amount: OrderTotalAmount) {
        super(id);
    }

    PaymentMethod(): OrderPaymentMethod{
        return this.paymentMethod;
    }

    Currency(): OrderCurrency{
        return this.currency;
    }

    Amount(): OrderTotalAmount{
        return this.amount;
    }
}