import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetDiscountByIdServiceEntryDto } from "../dtos/entry/get-discountById-entry.service.dto";
import { GetDiscountByIdServiceResponseDto } from "../dtos/response/get-discount-response.service.dto";
import { IDiscountRepository } from "src/discount/domain/repositories/discount-repositories.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Discount } from "src/discount/domain/discount";


export class getDiscountByIdService implements IApplicationService<GetDiscountByIdServiceEntryDto, GetDiscountByIdServiceResponseDto>{

    constructor(
        private readonly discountRepository: IDiscountRepository
    ){}
    
    async execute(data: GetDiscountByIdServiceEntryDto): Promise<Result<GetDiscountByIdServiceResponseDto>> {
        
        const discount: Result<Discount> = await this.discountRepository.findDiscountById(data.id);
        if(!discount.isSuccess()) {
            return Result.fail( discount.Error, discount.StatusCode, discount.Message )
        }

        const response: GetDiscountByIdServiceResponseDto = {
            id: discount.Value.Id.Id,
            name: discount.Value.Name.Name,
            description: discount.Value.Description.Description,
            expireDate: discount.Value.ExpireDate.ExpireDate,
            initDate: discount.Value.InitDate.InitDate,
            percentage: discount.Value.Percentage.Percentage
        };

        return Result.success(response, 200);
    }
}