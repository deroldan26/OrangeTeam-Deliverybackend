import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetProductByIdServiceEntryDto } from "../dtos/entry/get-productById-entry.service.dto";
import { GetProductByIdServiceResponseDto } from "../dtos/response/get-product-response.service.dto";
import { IProductRepository } from "../../domain/repositories/product-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Product } from "../../../product/domain/product";
import { IImageHandler } from "src/core/application/image.handler/image.handler";

export class getProductByIdService implements IApplicationService<GetProductByIdServiceEntryDto, GetProductByIdServiceResponseDto>{

    constructor(
        private readonly productRepository:IProductRepository,
        private readonly imageHandler: IImageHandler
    ){}
    
    async execute(data: GetProductByIdServiceEntryDto): Promise<Result<GetProductByIdServiceResponseDto>> {
        
        const product: Result<Product> = await this.productRepository.findProductById(data.id)
        if(!product.isSuccess()) {
            return Result.fail( product.Error, product.StatusCode, product.Message )
        }

        const urls = await Promise.all(product.Value.Images.map(image => this.imageHandler.generateImage(image.Image)));
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
            caducityDate: product.Value.CaducityDate ? product.Value.CaducityDate.CaducityDate : new Date('2050/01/01'),
            categories: product.Value.Categories.map(CategoryID => CategoryID.Id),
            discount: product.Value.Discount ? product.Value.Discount.Id : "",
        };
        return Result.success(response, 200);
    }
}