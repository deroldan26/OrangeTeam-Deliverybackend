import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetProductByIdServiceEntryDto } from "../dtos/entry/get-productById-entry.service.dto";
import { GetProductByIdServiceResponseDto } from "../dtos/response/get-product-response.service.dto";
import { IProductRepository } from "../../domain/repositories/product-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Product } from "../../../product/domain/product";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';

export class getProductByIdService implements IApplicationService<GetProductByIdServiceEntryDto, GetProductByIdServiceResponseDto>{

    constructor(
        private readonly productRepository:IProductRepository
    ){}
    
    async execute(data: GetProductByIdServiceEntryDto): Promise<Result<GetProductByIdServiceResponseDto>> {
        
        const product: Result<Product> = await this.productRepository.findProductById(data.id)
        if(!product.isSuccess()) {
            return Result.fail( product.Error, product.StatusCode, product.Message )
        }
        const urlGenerator = new ImageUrlGenerator();
        const url = await urlGenerator.generateUrl(product.Value.Image.Image);
        const response: GetProductByIdServiceResponseDto = {
            id: product.Value.Id.Id,
            name: product.Value.Name.Name,
            description: product.Value.Description.Description,
            image: url,
            price: product.Value.Price.Price,
            currency: product.Value.Currency.Currency,
            weight: product.Value.Weight.Weight
        };
        return Result.success(response, 200);
    }
}