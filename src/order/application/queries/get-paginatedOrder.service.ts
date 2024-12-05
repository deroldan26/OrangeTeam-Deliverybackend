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
    
    execute(data: GetPaginatedOrderServiceEntryDto): Promise<Result<GetPaginatedOrderServiceResponseDto>> {
        throw new Error("Method not implemented.");
    }
}