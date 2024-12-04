import { DomainEvent } from "../../../core/domain/domain.event";
import { OrderReport } from "../entities/orderReport";
import { PaymentMethod } from "../entities/paymentMethod";
import { OrderAddress } from "../value-objects/order.address";
import { OrderCreatedDate } from "../value-objects/order.created.date";
import { OrderID } from "../value-objects/order.id";
import { OrderStatus } from "../value-objects/order.status";
import { OrderReceivedDate } from "../value-objects/order.received.date";
import { Product } from "../entities/product";
import { Combo } from "../entities/combo";

export class orderCreatedEvent extends DomainEvent{
    protected constructor(
        public id: OrderID,
        public createdDate: OrderCreatedDate,
        public status: OrderStatus,
        public address: OrderAddress,
        public products: Product[],
        public combos: Combo[],
        public paymentMethod: PaymentMethod,
        public report?: OrderReport,
        public receivedDate?: OrderReceivedDate
    ){
        super()
    }
    static create(id: OrderID, createdDate: OrderCreatedDate, status: OrderStatus, address: OrderAddress, products: Product[], combos: Combo[], paymentMethod: PaymentMethod, report?: OrderReport, receivedDate?: OrderReceivedDate): orderCreatedEvent{
        return new orderCreatedEvent(id, createdDate, status, address, products, combos, paymentMethod, report, receivedDate);
    }
}