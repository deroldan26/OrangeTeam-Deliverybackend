import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetPaginatedProductServiceEntryDto } from "../dtos/entry/get-paginated-product-entry.service";
import { GetPaginatedProductServiceResponseDto } from "../dtos/response/get-paginated-product-response.service";
import { IProductRepository } from "../../domain/repositories/product-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Product } from "../../../product/domain/product";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';

export class GetPaginatedProductService implements IApplicationService<GetPaginatedProductServiceEntryDto, GetPaginatedProductServiceResponseDto>{
    constructor(private readonly productRepository: IProductRepository){}

    async execute(data: GetPaginatedProductServiceEntryDto): Promise<Result<GetPaginatedProductServiceResponseDto>> {
        const product: Result<Product[]> = await this.productRepository.findPaginatedProducts(data.page,data.take,data.name,data.category);

        if(!product.isSuccess){
            return Result.fail(product.Error, product.StatusCode, product.Message);
        }

        const urlGenerator = new ImageUrlGenerator();
        const response: GetPaginatedProductServiceResponseDto = {
            products: product.Value.map(product => ({
                id: product.Id.Id,
                name: product.Name.Name,
                description: product.Description.Description,
                images: product.Images.map(image => image.Image),
                price: product.Price.Price,
                currency: product.Currency.Currency,
                weight: product.Weight.Weight,
                stock: product.Stock.Stock,
                category: product.Category.Name
            }))
        }

        for (let i = 0; i < response.products.length; i++) {
            response.products[i].images = await Promise.all(
                response.products[i].images.map(async (image) => await urlGenerator.generateUrl(image))
            ); 
        }
        
        return Result.success(response,200);
    }
}