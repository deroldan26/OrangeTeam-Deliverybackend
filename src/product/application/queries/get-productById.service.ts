import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetProductByIdServiceEntryDto } from "../dtos/entry/get-productById-entry.service.dto";
import { GetProductByIdServiceResponseDto } from "../dtos/response/get-product-response.service.dto";
import { IProductRepository } from "src/product/domain/repositories/product-repositories.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Product } from "src/product/domain/product";

export class getProductByIdService implements IApplicationService<GetProductByIdServiceEntryDto, GetProductByIdServiceResponseDto>{

    constructor(
        private readonly productRepository:IProductRepository
    ){}
    
    async execute(data: GetProductByIdServiceEntryDto): Promise<Result<GetProductByIdServiceResponseDto>> {
        
        const product: Result<Product> = await this.productRepository.findProductById(data.id)
        if(!product.isSuccess()) {
            return Result.fail( product.Error, product.StatusCode, product.Message )
        }
        const response: GetProductByIdServiceResponseDto = {
            id: product.Value.Id.Id,
            name: product.Value.Name.Name,
        };
        return Result.success(response, 200);
    }
}