
import { ICuponRepository } from "src/cupon/domain/repositories/cupon-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { CuponID } from "src/cupon/domain/value-objects/cupon.id";

export class CuponValidatorService {
    constructor(private readonly cuponRepository: ICuponRepository) {}

    async validateCuponId(cuponId: string): Promise<Result<CuponID>> {
        
            const result = await this.cuponRepository.findCuponById(cuponId);

            if (!result.isSuccess()) {
                return Result.fail<CuponID>(
                    new Error(`Cupon with ID ${cuponId} does not exist`),
                    400,
                    `Invalid cupon ID: ${cuponId}`
                );
            }

        const cuponIdValueObject = new CuponID(cuponId);    
        
        return Result.success(cuponIdValueObject, 200);
    }
}
