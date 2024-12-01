import { IdGenerator } from "src/core/application/id.generator/id.generator";
import { IApplicationService } from "src/core/application/service/application-service.interface";
import { DomainEvent } from "src/core/domain/domain.event";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { CreateOrderServiceEntryDto } from "../dtos/entry/create-order-entry.service.dto";
import { CreateOrderServiceResponseDto } from "../dtos/response/create-order-response.service.dto";
import { Result } from "src/core/domain/result-handler/result";
import { MessagingService } from "src/core/infrastructure/events/rabbitmq/messaging.service";
import { Order } from "src/order/domain/order";
import { OrderID } from "src/order/domain/value-objects/order.id";
import { OrderCreatedDate } from "src/order/domain/value-objects/order.created.date";
import { OrderAddress } from "src/order/domain/value-objects/order.address";
import { OrderStatus } from "src/order/domain/value-objects/order.status";
import { Product } from "src/order/domain/entities/product";
import { OrderProductID } from "src/order/domain/value-objects/order.product.id";
import { OrderComboID } from "src/order/domain/value-objects/order.combo.id";
import { Combo } from "src/order/domain/entities/combo";
import { PaymentMethod } from "src/order/domain/entities/paymentMethod";
import { OrderProductQuantity } from "src/order/domain/value-objects/order.product.quantity";
import { OrderComboQuantity } from "src/order/domain/value-objects/order.combo.quantity";
import { OrderPaymentMethodID } from "src/order/domain/value-objects/order.payment.method.id";
import { OrderPaymentMethod } from "src/order/domain/value-objects/order.payment.method";
import { OrderCurrency } from "src/order/domain/value-objects/order.currency";
import { OrderTotalAmount } from "src/order/domain/value-objects/order.total.amount";
import { OrderReport } from "src/order/domain/entities/orderReport";
import { OrderReportDescription } from "src/order/domain/value-objects/order.report.description";
import { OrderReportID } from "src/order/domain/value-objects/order.report.id";
import { OrderReportDate } from "src/order/domain/value-objects/order.report.date";
import { OrderReceivedDate } from "src/order/domain/value-objects/order.received.date";
import { IPaymentRepository } from "src/order/domain/repositories/payment-repositories.interface";
import { IReportRepository } from "src/order/domain/repositories/report-repositories.interface";


export class createOrderService implements IApplicationService<CreateOrderServiceEntryDto, CreateOrderServiceResponseDto>{
    constructor(
        private readonly orderRepository:IOrderRepository,
        private readonly paymentRepository:IPaymentRepository,
        private readonly reportRepository:IReportRepository,
        private readonly idGenerator: IdGenerator<string>,
        private readonly messagingService: MessagingService<DomainEvent>,  
    ){}
    async execute(data: CreateOrderServiceEntryDto): Promise<Result<CreateOrderServiceResponseDto>> {
        const products = data.products.map(productData => {
            return new Product(new OrderProductID(productData.id), new OrderProductQuantity(productData.quantity));
        })

        const combos = await Promise.all(data.combos.map(async comboData => {
            return new Combo(new OrderComboID(comboData.id), new OrderComboQuantity(comboData.quantity));
        }))
        const order = new Order(
            new OrderID( await this.idGenerator.generateId()),
            new OrderCreatedDate(new Date()),
            new OrderStatus('CREATED'),
            new OrderAddress(data.address),
            products,
            combos,
            new PaymentMethod(new OrderPaymentMethodID(await this.idGenerator.generateId()), new OrderPaymentMethod(data.paymentMethod), new OrderCurrency(data.currency), new OrderTotalAmount(data.total)),
            new OrderReport(new OrderReportID(await this.idGenerator.generateId()), new OrderReportDescription("No Report submitted"), new OrderReportDate(new Date())),
            new OrderReceivedDate(new Date())
        )
        await this.paymentRepository.savePaymentEntity(order.PaymentMethod);
        await this.reportRepository.saveReportEntity(order.Report);
        const result = await this.orderRepository.saveOrderAggregate(order);
        if ( !result.isSuccess() ){
            return Result.fail<CreateOrderServiceResponseDto>( result.Error, result.StatusCode, result.Message )
        }
        const response: CreateOrderServiceResponseDto = {
            id: order.Id.Id,
            createdDate: order.CreatedDate.CreatedDate,
            status: order.Status.Status,
            address: order.Address.Address,
            products: order.Products,
            combos: order.Combos,
            paymentMethod: order.PaymentMethod
        };
        await this.messagingService.sendMessage('orderCreatedEvent', order.pullDomainEvent());
        return Result.success<CreateOrderServiceResponseDto>(response, 200);
    }
}