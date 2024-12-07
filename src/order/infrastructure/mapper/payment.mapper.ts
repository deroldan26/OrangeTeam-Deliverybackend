import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { PaymentMethod } from "src/order/domain/entities/paymentMethod";
import { OrderPaymentMethodID } from "src/order/domain/value-objects/order.payment.method.id";
import { OrderPaymentMethod } from "src/order/domain/value-objects/order.payment.method";
import { OrderCurrency } from "src/order/domain/value-objects/order.currency";
import { OrderTotalAmount } from "src/order/domain/value-objects/order.total.amount";
import { PaymentMethodEntity } from "../models/order.payment.method.entity";

export class PaymentMapper implements IMapper<PaymentMethod, PaymentMethodEntity> {

    //Aqui está el error
    async fromDomainToPersistence(domain: PaymentMethod): Promise<PaymentMethodEntity> {
        const paymentORM = new PaymentMethodEntity();
        paymentORM.id = domain.Id.PaymentMethodId;
        paymentORM.paymentMethodName = domain.PaymentMethod().PaymentMethod;
        paymentORM.currency = domain.Currency().Currency;
        paymentORM.amount = domain.Amount().TotalAmount;
        return paymentORM;
    }
    async fromPersistenceToDomain(persistence: PaymentMethodEntity): Promise<PaymentMethod> {
        return new PaymentMethod(new OrderPaymentMethodID(persistence.id), 
            new OrderPaymentMethod(persistence.paymentMethodName), 
            new OrderCurrency(persistence.currency), 
            new OrderTotalAmount(persistence.amount));
    }
  }