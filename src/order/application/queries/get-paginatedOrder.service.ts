import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetPaginatedOrderServiceEntryDto } from "../dtos/entry/get-paginated-order-entry.service";
import { GetPaginatedOrderServiceResponseDto } from "../dtos/response/get-paginated-order-response.dto";
import { Result } from "src/core/domain/result-handler/result";

export class GetPaginatedOrderService implements IApplicationService<GetPaginatedOrderServiceEntryDto, GetPaginatedOrderServiceResponseDto>{
    execute(data: GetPaginatedOrderServiceEntryDto): Promise<Result<GetPaginatedOrderServiceResponseDto>> {
        throw new Error("Method not implemented.");
    }
}