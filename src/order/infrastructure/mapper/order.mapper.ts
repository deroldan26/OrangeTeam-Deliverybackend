import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { Order } from "src/order/domain/order";
import { OrderEntity } from "../models/order.entity";
import { OrderID } from "src/order/domain/value-objects/order.id";
import { OrderAddress } from "src/order/domain/value-objects/order.address";
import { OrderStatus } from "src/order/domain/value-objects/order.status";
import { OrderCreatedDate } from "src/order/domain/value-objects/order.created.date";
import { OrderReceivedDate } from "src/order/domain/value-objects/order.received.date";
import { Product } from "src/order/domain/entities/product";
import { Combo } from "src/order/domain/entities/combo";
import { PaymentMethod } from "src/order/domain/entities/paymentMethod";
import { OrderPaymentMethodID } from "src/order/domain/value-objects/order.payment.method.id";
import { OrderPaymentMethod } from "src/order/domain/value-objects/order.payment.method";
import { OrderCurrency } from "src/order/domain/value-objects/order.currency";
import { OrderTotalAmount } from "src/order/domain/value-objects/order.total.amount";
import { OrderReport } from "src/order/domain/entities/orderReport";
import { OrderReportID } from "src/order/domain/value-objects/order.report.id";
import { OrderReportDescription } from "src/order/domain/value-objects/order.report.description";
import { OrderReportDate } from "src/order/domain/value-objects/order.report.date";

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
        orderORM.orderId = domain.Id.Id;
        orderORM.createdDate = domain.CreatedDate.CreatedDate;
        orderORM.status = domain.Status.Status;
        orderORM.address = domain.Address.Address;
        orderORM.products = domain.Products.map(product => product);
        orderORM.combos = domain.Combos.map(combo => combo);
        orderORM.paymentMethod.id = domain.PaymentMethod.Id.PaymentMethodId;
        orderORM.paymentMethod.paymentMethodName = domain.PaymentMethod.PaymentMethod().PaymentMethod;
        orderORM.paymentMethod.currency = domain.PaymentMethod.Currency().Currency;
        orderORM.paymentMethod.amount = domain.PaymentMethod.Amount().TotalAmount;
        orderORM.report.id = domain.Report.Id.ReportId;
        orderORM.report.description = domain.Report.ReportDescription().ReportDescription;
        orderORM.report.reportDate = domain.Report.ReportDate().ReportDate;
        orderORM.receivedDate = domain.ReceivedDate.ReceivedDate;
        console.log("orderORM:************")
        console.log(orderORM)
        return orderORM;
    }
    async fromPersistenceToDomain(persistence: OrderEntity): Promise<Order> {
        const products = persistence.products.map(product => new Product(product.Id, product.ProductQuantity()));
        const combos = persistence.combos.map(combo => new Combo(combo.Id, combo.ComboQuantity()));
        const paymentMethod = new PaymentMethod(new OrderPaymentMethodID(persistence.paymentMethod.id),new OrderPaymentMethod(persistence.paymentMethod.paymentMethodName),new OrderCurrency(persistence.paymentMethod.currency),new OrderTotalAmount(persistence.paymentMethod.amount));
        const report = new OrderReport(new OrderReportID(persistence.report.id),new OrderReportDescription(persistence.report.description),new OrderReportDate(persistence.report.reportDate));
        return new Order(new OrderID(persistence.orderId), 
                 new OrderCreatedDate(persistence.createdDate), 
                 new OrderStatus(persistence.status), 
                 new OrderAddress(persistence.address), 
                 products, 
                 combos, 
                 paymentMethod, 
                 report, 
                 new OrderReceivedDate(persistence.receivedDate));
    }
  }