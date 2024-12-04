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
        const urls = await Promise.all(product.Value.Images.map(image => urlGenerator.generateUrl(image.Image)));
        const response: GetProductByIdServiceResponseDto = {
            id: product.Value.Id.Id,
            name: product.Value.Name.Name,
            description: product.Value.Description.Description,
            images: urls,
            price: product.Value.Price.Price,
            currency: product.Value.Currency.Currency,
            weight: product.Value.Weight.Weight,
            measurement: product.Value.Measurement.Measurement,
            stock: product.Value.Stock.Stock,
            caducityDate: product.Value.CaducityDate ? product.Value.CaducityDate.CaducityDate : undefined,
            categories: product.Value.Categories.map(CategoryID => CategoryID.Id),
            discount: product.Value.Discount ? product.Value.Discount.Id : undefined,
        };
        return Result.success(response, 200);
    }
}