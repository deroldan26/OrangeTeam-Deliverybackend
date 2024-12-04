import { IApplicationService } from "src/core/application/service/application-service.interface";
import { UpdateOrderServiceEntryDto } from "../dtos/entry/update-order-entry.service.dto";
import { UpdateOrderServiceResponseDto } from "../dtos/response/update-order-response.service.dto";
import { Result } from "src/core/domain/result-handler/result";

export class updateOrderService implements IApplicationService<UpdateOrderServiceEntryDto, UpdateOrderServiceResponseDto>{
    execute(data: UpdateOrderServiceEntryDto): Promise<Result<UpdateOrderServiceResponseDto>> {
        throw new Error("Method not implemented.");
    }
    
}