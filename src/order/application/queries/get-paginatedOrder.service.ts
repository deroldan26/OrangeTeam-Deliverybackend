import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetPaginatedOrderServiceEntryDto } from "../dtos/entry/get-paginated-order-entry.service";
import { GetPaginatedOrderServiceResponseDto } from "../dtos/response/get-paginated-order-response.dto";
import { Result } from "src/core/domain/result-handler/result";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";

export class GetPaginatedOrderService implements IApplicationService<GetPaginatedOrderServiceEntryDto, GetPaginatedOrderServiceResponseDto>{
    
    constructor(private readonly orderRepository: IOrderRepository){}
    
    execute(data: GetPaginatedOrderServiceEntryDto): Promise<Result<GetPaginatedOrderServiceResponseDto>> {
        throw new Error("Method not implemented.");
    }
}