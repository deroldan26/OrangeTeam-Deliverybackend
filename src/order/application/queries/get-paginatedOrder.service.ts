import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetPaginatedOrderServiceEntryDto } from "../dtos/entry/get-paginated-order-entry.service";
import { GetPaginatedOrderServiceResponseDto } from "../dtos/response/get-paginated-order-response.dto";
import { Result } from "src/core/domain/result-handler/result";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { IOrderProductsRepository } from "src/order/domain/repositories/order-products-repositories.interface";
import { IOrderCombosRepository } from "src/order/domain/repositories/order-combos-repositories.interface";

export class GetPaginatedOrderService implements IApplicationService<GetPaginatedOrderServiceEntryDto, GetPaginatedOrderServiceResponseDto>{
    
    constructor(
        private readonly orderRepository:IOrderRepository,
        private readonly orderProductRepository: IOrderProductsRepository,
        private readonly orderComboRepository: IOrderCombosRepository
    ){}
    
    async execute(data: GetPaginatedOrderServiceEntryDto): Promise<Result<GetPaginatedOrderServiceResponseDto>> {
        
        const orders = await this.orderRepository.findPaginatedOrders(data.page,data.take,data.status,data.user);
        if(!orders.isSuccess()){
            return Result.fail(orders.Error, orders.StatusCode, orders.Message);
        }
        const response: GetPaginatedOrderServiceResponseDto = {
            orders: orders.Value.map(product => ({
                id: product.Id.Id,
                createdDate: product.CreatedDate.CreatedDate,
                status: product.Status.Status,
                address: product.Address.Address,
                latitude: product.Latitude.Latitude,
                longitude: product.Longitude.Longitude,
                receivedDate: product.ReceivedDate.ReceivedDate,
                cancelledDate: product.CancelledDate.CancelledDate,
                shippedDate: product.ShippedDate.ShippedDate,
                beingProcessedDate: product.BeingProcessedDate.BeingProcessedDate,
                indications: product.Indications.Indications,
                userId: product.UserID.UserId,
                paymentMethod: {
                    id: product.PaymentMethod.Id.PaymentMethodId,
                    paymentMethod: product.PaymentMethod.PaymentMethod,
                    currency: product.PaymentMethod.Currency,
                    total: product.PaymentMethod.Amount
                },
                report: product.Report.Id,
                products: product.Products.map(product => ({
                    id: product.Id.ProductId,
                    quantity: product.ProductQuantity().ProductQuantity
                })),
                combos: product.Combos.map(combo => ({
                    id: combo.Id.ComboId,
                    quantity: combo.ComboQuantity().ProductQuantity
                }))
            }))
        }
        return Result.success<GetPaginatedOrderServiceResponseDto>(response, 200);
    }
}