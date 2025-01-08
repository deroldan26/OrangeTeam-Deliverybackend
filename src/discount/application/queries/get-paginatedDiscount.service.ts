import { IApplicationService } from "src/core/application/service/application-service.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Discount } from "src/discount/domain/discount";
import { IDiscountRepository } from "src/discount/domain/repositories/discount-repositories.interface";
import { GetPaginatedDiscountServiceEntryDto } from "../dtos/entry/get-paginated-discount-entry.service.dto";
import { GetPaginatedDiscountServiceResponseDto } from "../dtos/response/get-paginated-discount-response.service.dto";


export class GetPaginatedDiscountService implements IApplicationService<GetPaginatedDiscountServiceEntryDto, GetPaginatedDiscountServiceResponseDto>{
    constructor(
        private readonly discountRepository: IDiscountRepository
    ){}

    async execute(data: GetPaginatedDiscountServiceEntryDto): Promise<Result<GetPaginatedDiscountServiceResponseDto>> {
        const discount: Result<Discount[]> = await this.discountRepository.findPaginatedDiscount(data.page,data.perpage);
        
        if(!discount.isSuccess){
            return Result.fail(discount.Error, discount.StatusCode, discount.Message);
        }

        const response: GetPaginatedDiscountServiceResponseDto = {
            discounts: discount.Value.map(discount => ({
                id: discount.Id.Id,
                name: discount.Name.Name,
                description: discount.Description.Description,
                expireDate: discount.ExpireDate.ExpireDate,
                initDate: discount.InitDate.InitDate,
                percentage: discount.Percentage.Percentage
            }))
        }
        
        return Result.success(response,200);
    }
}
