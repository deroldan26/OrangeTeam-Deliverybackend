import { IApplicationService } from "src/core/application/service/application-service.interface";
import { UpdateOrderServiceEntryDto } from "../dtos/entry/update-order-entry.service.dto";
import { UpdateOrderServiceResponseDto } from "../dtos/response/update-order-response.service.dto";
import { Result } from "src/core/domain/result-handler/result";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { DomainEvent } from "src/core/domain/domain.event";
import { MessagingService } from "src/core/infrastructure/events/rabbitmq/messaging.service";
import { OrderStatus } from "src/order/domain/value-objects/order.status";
import { OrderAddress } from "src/order/domain/value-objects/order.address";
import { OrderProductEntity } from "src/order/infrastructure/models/order.products.entity";
import { Product } from "src/order/domain/entities/product";
import { OrderProductID } from "src/order/domain/value-objects/order.product.id";
import { OrderProductQuantity } from "src/order/domain/value-objects/order.product.quantity";
import { Combo } from "src/order/domain/entities/combo";
import { OrderComboID } from "src/order/domain/value-objects/order.combo.id";
import { OrderComboQuantity } from "src/order/domain/value-objects/order.combo.quantity";
import { PaymentMethod } from "src/order/domain/entities/paymentMethod";
import { OrderPaymentMethod } from "src/order/domain/value-objects/order.payment.method";
import { OrderCurrency } from "src/order/domain/value-objects/order.currency";
import { OrderTotalAmount } from "src/order/domain/value-objects/order.total.amount";
import { OrderReport } from "src/order/domain/entities/orderReport";
import { OrderReportID } from "src/order/domain/value-objects/order.report.id";
import { OrderReportDescription } from "src/order/domain/value-objects/order.report.description";
import { OrderReportDate } from "src/order/domain/value-objects/order.report.date";
import { OrderReceivedDate } from "src/order/domain/value-objects/order.received.date";
import { IPaymentRepository } from "src/order/domain/repositories/payment-repositories.interface";
import { IReportRepository } from "src/order/domain/repositories/report-repositories.interface";
import { IOrderProductsRepository } from "src/order/domain/repositories/order-products-repositories.interface";
import { IOrderCombosRepository } from "src/order/domain/repositories/order-combos-repositories.interface";
import { OrderCancelledDate } from "src/order/domain/value-objects/order.cancelled.date";
import { OrderShippedDate } from "src/order/domain/value-objects/order.shipped.date";
import { OrderBeingProcessedDate } from "src/order/domain/value-objects/order.being.processed.date";
import { OrderIndications } from "src/order/domain/value-objects/order.indications";

export class updateOrderService implements IApplicationService<UpdateOrderServiceEntryDto, UpdateOrderServiceResponseDto>{
    
    constructor(
        private readonly orderRepository:IOrderRepository,
        private readonly paymentRepository:IPaymentRepository,
        private readonly reportRepository:IReportRepository,
        private readonly orderProductRepository: IOrderProductsRepository,
        private readonly orderComboProductRepository: IOrderCombosRepository,
        private readonly messagingService: MessagingService<DomainEvent>
    ) {}

    async execute(data: UpdateOrderServiceEntryDto): Promise<Result<UpdateOrderServiceResponseDto>> {
        const result = await this.orderRepository.findOrderById(data.id);
        if (!result.isSuccess()){
            return Result.fail<UpdateOrderServiceResponseDto>(result.Error, result.StatusCode, result.Message)
        }
        let products = result.Value.Products;
        if(data.products){
            products = data.products.map(productData => {
                return new Product(new OrderProductID(productData.id), new OrderProductQuantity(productData.quantity),result.Value.Id);
            })
            await this.orderProductRepository.saveOrderProductEntity(products);
        }
        let combos = result.Value.Combos;
        if(data.combos){
            combos = data.combos.map( comboData => {
                return new Combo(new OrderComboID(comboData.id), new OrderComboQuantity(comboData.quantity), result.Value.Id);
            })
            await this.orderComboProductRepository.saveOrderComboEntity(combos);
        }
        if(data.status) result.Value.ChangeStatus(new OrderStatus(data.status));
        if(data.address) result.Value.ChangeAddress(new OrderAddress(data.address));
        if(data.products) result.Value.ChangeProducts(products);
        if(data.combos) result.Value.ChangeCombos(combos);
        if(data.paymentMethod) {
            result.Value.ChangePaymentMethod(new PaymentMethod(result.Value.PaymentMethod.Id, new OrderPaymentMethod(data.paymentMethod), new OrderCurrency(data.currency), new OrderTotalAmount(data.total)));
            await this.paymentRepository.savePaymentEntity(result.Value.PaymentMethod);
        }
        if(data.report) {
            result.Value.ChangeReport(new OrderReport(new OrderReportID(result.Value.Report.Id.ReportId), new OrderReportDescription(data.report), new OrderReportDate(new Date())));
            await this.reportRepository.saveReportEntity(result.Value.Report);
        }
        if(data.receivedDate) result.Value.ChangeReceivedDate(new OrderReceivedDate(new Date()));
        if(data.status === 'DELIVERED') result.Value.ChangeReceivedDate(new OrderReceivedDate(new Date()));
        if(data.status === 'CANCELLED') result.Value.ChangeCancelledDate(new OrderCancelledDate(new Date()));
        if(data.status === 'SHIPPED') result.Value.ChangeShippedDate(new OrderShippedDate(new Date()));
        if(data.status === 'BEING PROCESSED') result.Value.ChangeBeingProcessedDate(new OrderBeingProcessedDate(new Date()));
        if(data.indications) result.Value.ChangeIndications(new OrderIndications(data.indications));

        const update = await this.orderRepository.saveOrderAggregate(result.Value);
        if (!update.isSuccess()){
            return Result.fail<UpdateOrderServiceResponseDto>(update.Error, update.StatusCode, update.Message)
        }

        const response: UpdateOrderServiceResponseDto = {
            id: update.Value.Id.Id,
            createdDate: update.Value.CreatedDate.CreatedDate,
            status: update.Value.Status.Status,
            address: update.Value.Address.Address,
            products: update.Value.Products,
            combos: update.Value.Combos,
            paymentMethod: update.Value.PaymentMethod,
            userId: update.Value.UserID,
            report: update.Value.Report,
            receivedDate: update.Value.ReceivedDate,
            cancelledDate: update.Value.CancelledDate,
            shippedDate: update.Value.ShippedDate,
            beingProcessedDate: update.Value.BeingProcessedDate,
            indications: update.Value.Indications.Indications
        };
        await this.messagingService.sendMessage('orderUpdatedEvent', update.Value.pullDomainEvent());
        return Result.success<UpdateOrderServiceResponseDto>(response, 200);
    }
    
}