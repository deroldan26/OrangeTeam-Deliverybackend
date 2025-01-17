import { UuidGenerator } from "../../../src/core/infrastructure/id.generator.ts/uuid-generator";
import { Order } from "../../../src/order/domain/order";
import { OrderID } from "../../../src/order/domain/value-objects/order.id";
import { OrderCreatedDate } from "../../../src/order/domain/value-objects/order.created.date";
import { OrderAddress } from "../../../src/order/domain/value-objects/order.address";
import { OrderStatus } from "../../../src/order/domain/value-objects/order.status";
import { Product } from "../../../src/order/domain/entities/product";
import { OrderProductID } from "../../../src/order/domain/value-objects/order.product.id";
import { OrderComboID } from "../../../src/order/domain/value-objects/order.combo.id";
import { Combo } from "../../../src/order/domain/entities/combo";
import { PaymentMethod } from "../../../src/order/domain/entities/paymentMethod";
import { OrderProductQuantity } from "../../../src/order/domain/value-objects/order.product.quantity";
import { OrderComboQuantity } from "../../../src/order/domain/value-objects/order.combo.quantity";
import { OrderPaymentMethodID } from "../../../src/order/domain/value-objects/order.payment.method.id";
import { OrderPaymentMethod } from "../../../src/order/domain/value-objects/order.payment.method";
import { OrderCurrency } from "../../../src/order/domain/value-objects/order.currency";
import { OrderTotalAmount } from "../../../src/order/domain/value-objects/order.total.amount";
import { OrderReport } from "../../../src/order/domain/entities/orderReport";
import { OrderReportDescription } from "../../../src/order/domain/value-objects/order.report.description";
import { OrderReportID } from "../../../src/order/domain/value-objects/order.report.id";
import { OrderReportDate } from "../../../src/order/domain/value-objects/order.report.date";
import { OrderReceivedDate } from "../../../src/order/domain/value-objects/order.received.date";
import { OrderUserID } from "../../../src/order/domain/value-objects/order.user.id";
import { OrderCancelledDate } from "../../../src/order/domain/value-objects/order.cancelled.date";
import { OrderBeingProcessedDate } from "../../../src/order/domain/value-objects/order.being.processed.date";
import { OrderShippedDate } from "../../../src/order/domain/value-objects/order.shipped.date";
import { OrderIndications } from "../../../src/order/domain/value-objects/order.indications";
import { OrderUserEmail } from "../../../src/order/domain/value-objects/order.user.email";
import { OrderCuponID } from "../../../src/order/domain/value-objects/order.cupon.id";
import { OrderLatitude } from "../../../src/order/domain/value-objects/order.latitude";
import { OrderLongitude } from "../../../src/order/domain/value-objects/order.longitude";

export class OrderMock {

    static async getOrderMock(userId:string, userEmail: string): Promise<Order> {
        const idGenerator = new UuidGenerator();

        const order = new Order(
            new OrderID( await idGenerator.generateId()),
            new OrderCreatedDate(new Date()),
            new OrderStatus('CREATED'),
            new OrderAddress('Calle 123456789'),
            new OrderLatitude(123),
            new OrderLongitude(123),
            [new Product(
                new OrderProductID(await idGenerator.generateId()),
                new OrderProductQuantity(1),
                new OrderID(await idGenerator.generateId()),
            )],
            [new Combo(
                new OrderComboID(await idGenerator.generateId()),
                new OrderComboQuantity(1),
                new OrderID(await idGenerator.generateId()),
            )],
            new PaymentMethod(new OrderPaymentMethodID(await idGenerator.generateId()), new OrderPaymentMethod(await idGenerator.generateId()), new OrderCurrency("USD"), new OrderTotalAmount(200)),
            new OrderUserID(userId),
            new OrderUserEmail(userEmail),
            new OrderReport(new OrderReportID(await idGenerator.generateId()), new OrderReportDescription("No Report submitted"), new OrderReportDate(new Date())),
            new OrderReceivedDate(new Date()),
            new OrderCancelledDate(new Date()),
            new OrderShippedDate(new Date()),
            new OrderBeingProcessedDate(new Date()),
            new OrderIndications("No Indications"),
            new OrderCuponID("No Cupon")
        )
        
        return order;
    }

    static create(){
        return new OrderMock();
    }
}