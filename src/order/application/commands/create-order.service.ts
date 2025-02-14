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
import { IOrderProductsRepository } from "src/order/domain/repositories/order-products-repositories.interface";
import { IOrderCombosRepository } from "src/order/domain/repositories/order-combos-repositories.interface";
import { OrderUserID } from "src/order/domain/value-objects/order.user.id";
import { OrderCancelledDate } from "src/order/domain/value-objects/order.cancelled.date";
import { OrderBeingProcessedDate } from "src/order/domain/value-objects/order.being.processed.date";
import { OrderShippedDate } from "src/order/domain/value-objects/order.shipped.date";
import { OrderIndications } from "src/order/domain/value-objects/order.indications";
import { IUserRepository } from "src/user/domain/repositories/user-repositories.interface";
import { OrderUserEmail } from "src/order/domain/value-objects/order.user.email";
import { OrderCuponID } from "src/order/domain/value-objects/order.cupon.id";
import { OrderLatitude } from "src/order/domain/value-objects/order.latitude";
import { OrderLongitude } from "src/order/domain/value-objects/order.longitude";

export class createOrderService implements IApplicationService<CreateOrderServiceEntryDto, CreateOrderServiceResponseDto>{
    constructor(
        private readonly orderRepository:IOrderRepository,
        private readonly paymentRepository:IPaymentRepository,
        private readonly reportRepository:IReportRepository,
        private readonly orderProductRepository: IOrderProductsRepository,
        private readonly orderComboProductRepository: IOrderCombosRepository,
        private readonly idGenerator: IdGenerator<string>,
        private readonly messagingService: MessagingService<DomainEvent>,
        private readonly userRepository: IUserRepository
    ){}
    async execute(data: CreateOrderServiceEntryDto): Promise<Result<CreateOrderServiceResponseDto>> {
        const orderId = new OrderID( await this.idGenerator.generateId())
        const products = data.products.map(productData => {
            return new Product(new OrderProductID(productData.id), new OrderProductQuantity(productData.quantity), orderId);
        })
        const combos = await Promise.all(data.combos.map(async comboData => {
            return new Combo(new OrderComboID(comboData.id), new OrderComboQuantity(comboData.quantity), orderId);
        }))
        const user = await this.userRepository.findUserById(data.userId);
        console.log(data.cupon_code)
        console.log(data.indications)
        if(!data.cupon_code || data.cupon_code === "" || data.cupon_code === null || data.cupon_code === undefined){
            data.cupon_code = "No Cupon";
        }
        if(!data.indications || data.indications === "" || data.indications === null || data.indications === undefined){
            data.indications = "No Indications";
        }
        const order = new Order(
            orderId,
            new OrderCreatedDate(new Date()),
            new OrderStatus('CREATED'),
            new OrderAddress(data.address),
            new OrderLatitude(data.latitude),
            new OrderLongitude(data.longitude),
            products,
            combos,
            new PaymentMethod(new OrderPaymentMethodID(await this.idGenerator.generateId()), new OrderPaymentMethod(data.paymentMethod), new OrderCurrency(data.currency), new OrderTotalAmount(data.total)),
            new OrderUserID(data.userId),
            new OrderUserEmail(user.Value.Email.Email),
            new OrderReport(new OrderReportID(await this.idGenerator.generateId()), new OrderReportDescription("No Report submitted"), new OrderReportDate(new Date())),
            new OrderReceivedDate(new Date()),
            new OrderCancelledDate(new Date()),
            new OrderShippedDate(new Date()),
            new OrderBeingProcessedDate(new Date()),
            new OrderIndications(data.indications),
            new OrderCuponID(data.cupon_code)
        )
        await this.paymentRepository.savePaymentEntity(order.PaymentMethod);
        await this.reportRepository.saveReportEntity(order.Report);
        await this.orderProductRepository.saveOrderProductEntity(order.Products);
        await this.orderComboProductRepository.saveOrderComboEntity(order.Combos);
        const result = await this.orderRepository.saveOrderAggregate(order);
        if ( !result.isSuccess() ){
            return Result.fail<CreateOrderServiceResponseDto>( result.Error, result.StatusCode, result.Message )
        }
        const response: CreateOrderServiceResponseDto = {
            id: order.Id.Id,
            createdDate: order.CreatedDate.CreatedDate,
            status: order.Status.Status,
            address: order.Address.Address,
            latitude: order.Latitude.Latitude,
            longitude: order.Longitude.Longitude,
            products: order.Products,
            combos: order.Combos,
            paymentMethod: order.PaymentMethod,
            userId: order.UserID.UserId,
        };
        await this.messagingService.sendMessage('orderCreatedEvent', order.pullDomainEvent());
        return Result.success<CreateOrderServiceResponseDto>(response, 200);
    }
}