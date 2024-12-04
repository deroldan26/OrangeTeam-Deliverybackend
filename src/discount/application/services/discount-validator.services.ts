
import { IDiscountRepository } from "src/discount/domain/repositories/discount-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { DiscountID } from "src/discount/domain/value-objects/discount.id";

export class DiscountValidatorService {
    constructor(private readonly discountRepository: IDiscountRepository) {}

    async validateDiscountId(discountId: string): Promise<Result<DiscountID>> {
        
            const result = await this.discountRepository.findDiscountById(discountId);

            if (!result.isSuccess()) {
                return Result.fail<DiscountID>(
                    new Error(`Discount with ID ${discountId} does not exist`),
                    400,
                    `Invalid discount ID: ${discountId}`
                );
            }

        const discountIdValueObject = new DiscountID(discountId);    
        
        return Result.success(discountIdValueObject, 200);
    }
}
