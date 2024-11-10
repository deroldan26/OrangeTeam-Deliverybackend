import { IApplicationService } from "src/core/application/service/application-service.interface";
import { CreateProductServiceEntryDto } from "../dtos/entry/create-product-entry.service.dto";
import { Result } from "src/core/domain/result-handler/result";
import { CreateProductServiceResponseDto } from "../dtos/response/create-product-response.service.dto";
import { IProductRepository } from "src/product/domain/repositories/product-repositories.interface";
import { IdGenerator } from "src/core/application/id.generator/id.generator";
import { Product } from "src/product/domain/product";
import { ProductID } from "src/product/domain/value-objects/product.id";
import { ProductName } from "src/product/domain/value-objects/product.name";
import { ProductDescription } from "src/product/domain/value-objects/product.description";
import { ProductImage } from "src/product/domain/value-objects/product.image";
import { ProductPrice } from "src/product/domain/value-objects/product.price";
import { ProductCurrency } from "src/product/domain/value-objects/product.currency";
import { ProductWeight } from "src/product/domain/value-objects/product.weight";

export class createProductService implements IApplicationService<CreateProductServiceEntryDto, CreateProductServiceResponseDto>{

    constructor(
        private readonly productRepository:IProductRepository,
        private readonly idGenerator: IdGenerator<string>   
    ){}
    
    async execute(data: CreateProductServiceEntryDto): Promise<Result<CreateProductServiceResponseDto>> {
        const product = new Product(
            new ProductID( await this.idGenerator.generateId()), 
            new ProductName(data.name),
            new ProductDescription(data.description),
            new ProductImage(data.image),
            new ProductPrice(data.price),
            new ProductCurrency(data.currency),
            new ProductWeight(data.weight));
        const result = await this.productRepository.saveProductAggregate(product);
        if ( !result.isSuccess() ){
            return Result.fail<CreateProductServiceResponseDto>( result.Error, result.StatusCode, result.Message )
        }
        const response: CreateProductServiceResponseDto = {
            id: product.Id.Id,
            name: product.Name.Name,
            description: product.Description.Description,
            image: product.Image.Image,
            price: product.Price.Price,
            currency: product.Currency.Currency,
            weight: product.Weight.Weight
        };
        return Result.success<CreateProductServiceResponseDto>(response, 200);
    }
}