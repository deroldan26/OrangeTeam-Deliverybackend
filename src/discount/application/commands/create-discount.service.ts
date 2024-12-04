import { IApplicationService } from "src/core/application/service/application-service.interface";
import { CreateDiscountServiceEntryDto } from "../dtos/entry/create-discount-entry.service.dto";
import { CreateDiscountServiceResponseDto } from "../dtos/response/create-discount-response.service.dto";
import { IDiscountRepository } from "src/discount/domain/repositories/discount-repositories.interface";
import { IdGenerator } from "src/core/application/id.generator/id.generator";
import { Result } from "src/core/domain/result-handler/result";
import { Discount } from "src/discount/domain/discount";
import { DiscountDescription } from "src/discount/domain/value-objects/discount.description";
import { DiscountExpireDate } from "src/discount/domain/value-objects/discount.expireDate";
import { DiscountName } from "src/discount/domain/value-objects/discount.name";
import { DiscountID } from "src/discount/domain/value-objects/discount.id";
import { DiscountInitDate } from "src/discount/domain/value-objects/discount.initDate";
import { DiscountPercentage } from "src/discount/domain/value-objects/discount.percentage";


export class createDiscountService implements IApplicationService<CreateDiscountServiceEntryDto, CreateDiscountServiceResponseDto> {

    constructor(
        private readonly discountRepository: IDiscountRepository,
        private readonly idGenerator: IdGenerator<string> 
    ) {}

    async execute(data: CreateDiscountServiceEntryDto): Promise<Result<CreateDiscountServiceResponseDto>> {
        
        const discount = new Discount(
            new DiscountID(await this.idGenerator.generateId()),
            new DiscountName(data.name),
            new DiscountDescription(data.description),
            new DiscountExpireDate(data.expireDate),
            new DiscountInitDate(data.initDate),
            new DiscountPercentage(data.percentage),
        );

        const result = await this.discountRepository.saveDiscountAggregate(discount);
        if (!result.isSuccess()) {
            return Result.fail<CreateDiscountServiceResponseDto>(result.Error, result.StatusCode, result.Message);
        }
        
        const response: CreateDiscountServiceResponseDto = {
            id: discount.Id.Id,
            name: discount.Name.Name,
            description: discount.Description.Description,
            expireDate: discount.ExpireDate.ExpireDate,
            initDate: discount.InitDate.InitDate,
            percentage: discount.Percentage.Percentage,
        };

        return Result.success<CreateDiscountServiceResponseDto>(response, 200);
    }
}
