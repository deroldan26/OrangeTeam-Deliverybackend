import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { CreateProductServiceEntryDto } from "../dtos/entry/create-product-entry.service.dto";
import { Result } from "../../../core/domain/result-handler/result";
import { CreateProductServiceResponseDto } from "../dtos/response/create-product-response.service.dto";
import { IProductRepository } from "../../domain/repositories/product-repositories.interface";
import { IdGenerator } from "../../../core/application/id.generator/id.generator";
import { Product } from "../../domain/product";
import { ProductID } from "../../domain/value-objects/product.id";
import { ProductName } from "../../domain/value-objects/product.name";
import { ProductDescription } from "../../domain/value-objects/product.description";
import { ProductImage } from "../../domain/value-objects/product.image";
import { ProductPrice } from "../../domain/value-objects/product.price";
import { ProductCurrency } from "../../domain/value-objects/product.currency";
import { ProductWeight } from "../../domain/value-objects/product.weight";
import { ProductStock } from "src/product/domain/value-objects/product.stock";
import { CategoryName } from "src/product/domain/value-objects/category.name";

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
            new ProductWeight(data.weight),
            new ProductStock(data.stock),
            new CategoryName(data.category));
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
            weight: product.Weight.Weight,
            stock: product.Stock.Stock,
            category: product.Category.Name
        };
        return Result.success<CreateProductServiceResponseDto>(response, 200);
    }
}