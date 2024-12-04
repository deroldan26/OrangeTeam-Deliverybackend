import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetOrderByIdServiceEntryDto } from "../dtos/entry/get-orderById-entry.service.dto";
import { GetOrderByIdServiceResponseDto } from "../dtos/response/get-order-response.service.dto";
import { Result } from "src/core/domain/result-handler/result";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { Order } from "src/order/domain/order";
import { IOrderProductsRepository } from "src/order/domain/repositories/order-products-repositories.interface";
import { IOrderCombosRepository } from "src/order/domain/repositories/order-combos-repositories.interface";
import { Product } from "src/order/domain/entities/product";
import { Combo } from "src/order/domain/entities/combo";


export class getOrderByIdService implements IApplicationService<GetOrderByIdServiceEntryDto, GetOrderByIdServiceResponseDto>{
    
    constructor(
        private readonly orderRepository:IOrderRepository,
        private readonly orderProductRepository: IOrderProductsRepository,
        private readonly orderComboRepository: IOrderCombosRepository
    ){}

    async execute(data: GetOrderByIdServiceEntryDto): Promise<Result<GetOrderByIdServiceResponseDto>> {
        const order: Result<Order> = await this.orderRepository.findOrderById(data.id);
        const products: Result<Product[]> = await this.orderProductRepository.findOrderProductById(data.id);
        const combos: Result<Combo[]> = await this.orderComboRepository.findOrderComboById(data.id);
        console.log(order.Value)
        if(!order.isSuccess()) {
            return Result.fail( order.Error, order.StatusCode, order.Message )
        }
        if(!products.isSuccess()) {
            return Result.fail( products.Error, products.StatusCode, products.Message )
        }
        if(!combos.isSuccess()) {
            return Result.fail( combos.Error, combos.StatusCode, combos.Message )
        }
        const response: GetOrderByIdServiceResponseDto = {
            id: order.Value.Id.Id,
            createdDate: order.Value.CreatedDate.CreatedDate,
            status: order.Value.Status.Status,
            address: order.Value.Address.Address,
            products: products.Value.map(product => {
                return {
                    id: product.Id.ProductId,
                    quantity: product.ProductQuantity().ProductQuantity
                }
            }),
            combos: combos.Value.map(combo => {
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
        return Result.success(response, 200);
    }

}