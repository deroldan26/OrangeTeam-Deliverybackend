import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetPaginatedProductServiceEntryDto } from "../dtos/entry/get-paginated-product-entry.service";
import { GetPaginatedProductServiceResponseDto } from "../dtos/response/get-paginated-product-response.service";
import { IProductRepository } from "../../domain/repositories/product-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Product } from "../../../product/domain/product";
import { IImageHandler } from "src/core/application/image.handler/image.handler";

export class GetPaginatedProductService implements IApplicationService<GetPaginatedProductServiceEntryDto, GetPaginatedProductServiceResponseDto>{
    constructor(
        private readonly productRepository: IProductRepository,
        private readonly imageHandler: IImageHandler
    ){}

    async execute(data: GetPaginatedProductServiceEntryDto): Promise<Result<GetPaginatedProductServiceResponseDto>> {
        const product: Result<Product[]> = await this.productRepository.findPaginatedProducts(data.page,data.perpage,data.name,data.category);

        if(!product.isSuccess){
            return Result.fail(product.Error, product.StatusCode, product.Message);
        }

        const response: GetPaginatedProductServiceResponseDto = {
            products: product.Value.map(product => ({
                id: product.Id.Id,
                name: product.Name.Name,
                description: product.Description.Description,
                images: product.Images.map(image => image.Image),
                price: product.Price.Price,
                currency: product.Currency.Currency,
                weight: product.Weight.Weight,
                measurement: product.Measurement.Measurement,
                stock: product.Stock.Stock,
                categories: product.Categories.map(category => category.Id),
                caducityDate: product.CaducityDate ? product.CaducityDate.CaducityDate : new Date('2050/01/01'),
                discount: product.Discount ? product.Discount.Id : ""
            }))
        }

        for (let i = 0; i < response.products.length; i++) {
            response.products[i].images = await Promise.all(
                response.products[i].images.map(async (image) => await this.imageHandler.generateImage(image))
            ); 
        }
        
        return Result.success(response,200);
    }
}