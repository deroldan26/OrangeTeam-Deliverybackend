import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetPaginatedProductServiceEntryDto } from "../dtos/entry/get-paginated-product-entry.service";
import { GetPaginatedProductServiceResponseDto } from "../dtos/response/get-paginated-product-response.service";
import { IProductRepository } from "src/product/domain/repositories/product-repositories.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Product } from "src/product/domain/product";


export class GetPaginatedProductService implements IApplicationService<GetPaginatedProductServiceEntryDto, GetPaginatedProductServiceResponseDto>{
    constructor(private readonly productRepository: IProductRepository){}

    async execute(data: GetPaginatedProductServiceEntryDto): Promise<Result<GetPaginatedProductServiceResponseDto>> {
        const product: Result<Product[]> = await this.productRepository.findPaginatedProducts(data.page,data.take);

        if(!product.isSuccess){
            return Result.fail(product.Error, product.StatusCode, product.Message);
        }

        const response: GetPaginatedProductServiceResponseDto = {
            products: product.Value.map(product => ({
                id: product.Id.Id,
                name: product.Name.Name,
            }))
        }
        
        return Result.success(response,200);
    }
}