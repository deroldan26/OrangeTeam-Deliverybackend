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
import { OrderCancelledDate } from "../value-objects/order.cancelled.date";
import { OrderShippedDate } from "../value-objects/order.shipped.date";
import { OrderBeingProcessedDate } from "../value-objects/order.being.processed.date";
import { OrderIndications } from "../value-objects/order.indications";
import { OrderUserID } from "../value-objects/order.user.id";
import { OrderCuponID } from "../value-objects/order.cupon.id";
import { OrderUserEmail } from "../value-objects/order.user.email";

export class orderCreatedEvent extends DomainEvent{
    protected constructor(
        public id: OrderID,
        public createdDate: OrderCreatedDate,
        public status: OrderStatus,
        public address: OrderAddress,
        public products: Product[],
        public combos: Combo[],
        public paymentMethod: PaymentMethod,
        public userId: OrderUserID,
        public userEmail: OrderUserEmail,
        public report?: OrderReport,
        public receivedDate?: OrderReceivedDate,
        public cancelledDate?: OrderCancelledDate,
        public shippedDate?: OrderShippedDate,
        public beingProcessedDate?: OrderBeingProcessedDate,
        public indications?: OrderIndications,
        public cupon?: OrderCuponID
    ){
        super()
    }
    static create(id: OrderID, createdDate: OrderCreatedDate, status: OrderStatus, address: OrderAddress, products: Product[], combos: Combo[], paymentMethod: PaymentMethod, userId:OrderUserID, userEmail: OrderUserEmail, report?: OrderReport, receivedDate?: OrderReceivedDate, cancelledDate?: OrderCancelledDate, shippedDate?: OrderShippedDate, beingProcessedDate?: OrderBeingProcessedDate, indications?: OrderIndications, cupon?: OrderCuponID): orderCreatedEvent{
        return new orderCreatedEvent(id, createdDate, status, address, products, combos, paymentMethod, userId, userEmail, report, receivedDate, cancelledDate, shippedDate, beingProcessedDate, indications, cupon);
    }
}