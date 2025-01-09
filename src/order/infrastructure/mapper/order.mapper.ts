import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { Order } from "src/order/domain/order";
import { OrderEntity } from "../models/order.entity";
import { OrderID } from "src/order/domain/value-objects/order.id";
import { OrderAddress } from "src/order/domain/value-objects/order.address";
import { OrderStatus } from "src/order/domain/value-objects/order.status";
import { OrderCreatedDate } from "src/order/domain/value-objects/order.created.date";
import { OrderReceivedDate } from "src/order/domain/value-objects/order.received.date";
import { PaymentMethod } from "src/order/domain/entities/paymentMethod";
import { OrderPaymentMethodID } from "src/order/domain/value-objects/order.payment.method.id";
import { OrderPaymentMethod } from "src/order/domain/value-objects/order.payment.method";
import { OrderCurrency } from "src/order/domain/value-objects/order.currency";
import { OrderTotalAmount } from "src/order/domain/value-objects/order.total.amount";
import { OrderReport } from "src/order/domain/entities/orderReport";
import { OrderReportID } from "src/order/domain/value-objects/order.report.id";
import { OrderReportDescription } from "src/order/domain/value-objects/order.report.description";
import { OrderReportDate } from "src/order/domain/value-objects/order.report.date";
import { OrderProductEntity } from "../models/order.products.entity";
import { OrderComboEntity } from "../models/order.combos.entity";
import { Product } from "src/order/domain/entities/product";
import { Combo } from "src/order/domain/entities/combo";
import { OrderUserID } from "src/order/domain/value-objects/order.user.id";
import { OrderCancelledDate } from "src/order/domain/value-objects/order.cancelled.date";
import { OrderShippedDate } from "src/order/domain/value-objects/order.shipped.date";
import { OrderIndications } from "src/order/domain/value-objects/order.indications";
import { OrderBeingProcessedDate } from "src/order/domain/value-objects/order.being.processed.date";
import { OrderUserEmail } from "src/order/domain/value-objects/order.user.email";
import { OrderCuponID } from "src/order/domain/value-objects/order.cupon.id";
import { OrderLatitude } from "src/order/domain/value-objects/order.latitude";
import { OrderLongitude } from "src/order/domain/value-objects/order.longitude";

export class OrderMapper implements IMapper<Order, OrderEntity> {

    //Aqui está el error
    async fromDomainToPersistence(domain: Order): Promise<OrderEntity> {
        const orderORM = new OrderEntity();
        if (!orderORM.paymentMethod) {
            orderORM.paymentMethod = {
                id: domain.PaymentMethod.Id.PaymentMethodId,
                amount: domain.PaymentMethod.Amount().TotalAmount,
                currency: domain.PaymentMethod.Currency().Currency,
                paymentMethodName: domain.PaymentMethod.PaymentMethod().PaymentMethod
            };
        }
        if (!orderORM.report) {
            orderORM.report = {
                id: domain.Report.Id.ReportId,
                description: domain.Report.ReportDescription().ReportDescription,
                reportDate: domain.Report.ReportDate().ReportDate
            };
        }
        if (!orderORM.products) {
            orderORM.products = domain.Products.map(product => {
                const orderProductEntity = new OrderProductEntity();
                orderProductEntity.id = product.Id.ProductId;
                orderProductEntity.quantity = product.ProductQuantity().ProductQuantity;
                orderProductEntity.orderId = product.ProductOrder().Id; // reference only the id of the order
                return orderProductEntity;
            });
        }
        if (!orderORM.combos) {
            orderORM.combos = domain.Combos.map(combo => {
                const orderComboEntity = new OrderComboEntity();
                orderComboEntity.id = combo.Id.ComboId;
                orderComboEntity.quantity = combo.ComboQuantity().ProductQuantity;
                orderComboEntity.orderId = combo.ComboOrder().Id; // reference only the id of the order
                return orderComboEntity;
            });
        }
        orderORM.orderId = domain.Id.Id;
        orderORM.createdDate = domain.CreatedDate.CreatedDate;
        orderORM.status = domain.Status.Status;
        orderORM.address = domain.Address.Address;
        orderORM.latitude = domain.Latitude.Latitude;
        orderORM.longitude = domain.Longitude.Longitude;
        orderORM.paymentMethod.id = domain.PaymentMethod.Id.PaymentMethodId;
        orderORM.paymentMethod.paymentMethodName = domain.PaymentMethod.PaymentMethod().PaymentMethod;
        orderORM.paymentMethod.currency = domain.PaymentMethod.Currency().Currency;
        orderORM.paymentMethod.amount = domain.PaymentMethod.Amount().TotalAmount;
        orderORM.userId = domain.UserID.UserId;
        orderORM.userEmail = domain.UserEmail.Email;
        orderORM.report.id = domain.Report.Id.ReportId;
        orderORM.report.description = domain.Report.ReportDescription().ReportDescription;
        orderORM.report.reportDate = domain.Report.ReportDate().ReportDate;
        if(domain.ReceivedDate.ReceivedDate) orderORM.receivedDate = domain.ReceivedDate.ReceivedDate;
        else orderORM.receivedDate = null;
        if(domain.CancelledDate.CancelledDate) orderORM.cancelledDate = domain.CancelledDate.CancelledDate;
        else orderORM.cancelledDate = null;
        if(domain.ShippedDate.ShippedDate) orderORM.shippedDate = domain.ShippedDate.ShippedDate;
        else orderORM.shippedDate = null;
        if(domain.BeingProcessedDate.BeingProcessedDate) orderORM.beingProcessedDate = domain.BeingProcessedDate.BeingProcessedDate;
        else orderORM.beingProcessedDate = null;
        orderORM.indications = domain.Indications.Indications;
        if(domain.Cupon.CuponId) orderORM.cupon = domain.Cupon.CuponId;
        else orderORM.cupon = "No Cupon";
        return orderORM;
    }
    async fromPersistenceToDomain(persistence: OrderEntity): Promise<Order> {
        const paymentMethod = new PaymentMethod(new OrderPaymentMethodID(persistence.paymentMethod.id),new OrderPaymentMethod(persistence.paymentMethod.paymentMethodName),new OrderCurrency(persistence.paymentMethod.currency),new OrderTotalAmount(persistence.paymentMethod.amount));
        const report = new OrderReport(new OrderReportID(persistence.report.id),new OrderReportDescription(persistence.report.description),new OrderReportDate(persistence.report.reportDate));
        return new Order(new OrderID(persistence.orderId), 
                 new OrderCreatedDate(persistence.createdDate), 
                 new OrderStatus(persistence.status), 
                 new OrderAddress(persistence.address),
                 new OrderLatitude(persistence.latitude),
                 new OrderLongitude(persistence.longitude), 
                //  products, 
                //  combos,
                [],
                [], 
                 paymentMethod,
                 new OrderUserID(persistence.userId),
                 new OrderUserEmail(persistence.userEmail), 
                 report, 
                 new OrderReceivedDate(persistence.receivedDate),
                 new OrderCancelledDate(persistence.cancelledDate),
                 new OrderShippedDate(persistence.shippedDate),
                 new OrderBeingProcessedDate(persistence.beingProcessedDate),
                 new OrderIndications(persistence.indications),
                 new OrderCuponID(persistence.cupon));
    }

    async fromPersistenceToDomainOrder(persistence: OrderEntity, products:Product[], combos:Combo[]): Promise<Order> {
        const paymentMethod = new PaymentMethod(new OrderPaymentMethodID(persistence.paymentMethod.id),new OrderPaymentMethod(persistence.paymentMethod.paymentMethodName),new OrderCurrency(persistence.paymentMethod.currency),new OrderTotalAmount(persistence.paymentMethod.amount));
        const report = new OrderReport(new OrderReportID(persistence.report.id),new OrderReportDescription(persistence.report.description),new OrderReportDate(persistence.report.reportDate));
        return new Order(new OrderID(persistence.orderId), 
                 new OrderCreatedDate(persistence.createdDate), 
                 new OrderStatus(persistence.status), 
                 new OrderAddress(persistence.address), 
                 new OrderLatitude(persistence.latitude),
                 new OrderLongitude(persistence.longitude),
                 products, 
                 combos, 
                 paymentMethod, 
                 new OrderUserID(persistence.userId),
                 new OrderUserEmail(persistence.userEmail),
                 report, 
                 new OrderReceivedDate(persistence.receivedDate),
                 new OrderCancelledDate(persistence.cancelledDate),
                 new OrderShippedDate(persistence.shippedDate),
                 new OrderBeingProcessedDate(persistence.beingProcessedDate),
                 new OrderIndications(persistence.indications),
                 new OrderCuponID(persistence.cupon));
    }
  }