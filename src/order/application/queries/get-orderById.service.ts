import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetOrderByIdServiceEntryDto } from "../dtos/entry/get-orderById-enrty.service.dto";
import { GetOrderByIdServiceResponseDto } from "../dtos/response/get-order-response.service.dto";
import { Result } from "src/core/domain/result-handler/result";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { Order } from "src/order/domain/order";


export class getOrderByIdService implements IApplicationService<GetOrderByIdServiceEntryDto, GetOrderByIdServiceResponseDto>{
    
    constructor(
        private readonly orderRepository:IOrderRepository
    ){}

    async execute(data: GetOrderByIdServiceEntryDto): Promise<Result<GetOrderByIdServiceResponseDto>> {
        const order: Result<Order> = await this.orderRepository.findOrderById(data.id);
        console.log(order.Value)
        if(!order.isSuccess()) {
            return Result.fail( order.Error, order.StatusCode, order.Message )
        }
        const response: GetOrderByIdServiceResponseDto = {
            id: order.Value.Id.Id,
            createdDate: order.Value.CreatedDate.CreatedDate,
            status: order.Value.Status.Status,
            address: order.Value.Address.Address,
            products: order.Value.Products.map(product => {
                return {
                    id: product.Id.ProductId,
                    quantity: product.ProductQuantity().ProductQuantity
                }
            }),
            combos: order.Value.Combos.map(combo => {
                return {
                    id: combo.Id.ComboId,
                    quantity: combo.ComboQuantity().ProductQuantity
                }
            }),
            paymentMethod: {
                id: order.Value.PaymentMethod.Id.PaymentMethodId,
                paymentMethod: order.Value.PaymentMethod.PaymentMethod().PaymentMethod,
                currency: order.Value.PaymentMethod.Currency().Currency,
                total: order.Value.PaymentMethod.Amount().TotalAmount
            },
            report: {
                id: order.Value.Report.Id.ReportId,
                description: order.Value.Report.ReportDescription().ReportDescription,
                reportDate: order.Value.Report.ReportDate().ReportDate
            },
            receivedDate: order.Value.ReceivedDate.ReceivedDate
        }
        throw new Error("Method not implemented.");
    }

}