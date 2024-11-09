import { IApplicationService } from "src/core/application/service/application-service.interface";
import { CreateProductServiceEntryDto } from "../dtos/entry/create-product-entry.service.dto";
import { Result } from "src/core/domain/result-handler/result";
import { CreateProductServiceResponseDto } from "../dtos/response/create-product-response.service.dto";
import { IProductRepository } from "src/product/domain/repositories/product-repositories.interface";
import { IdGenerator } from "src/core/application/id.generator/id.generator";
import { Product } from "src/product/domain/product";
import { ProductID } from "src/product/domain/value-objects/product.id";
import { ProductName } from "src/product/domain/value-objects/product.name";

export class createProductService implements IApplicationService<CreateProductServiceEntryDto, CreateProductServiceResponseDto>{

    constructor(
        private readonly productRepository:IProductRepository,
        private readonly idGenerator: IdGenerator<string>   
    ){}
    
    async execute(data: CreateProductServiceEntryDto): Promise<Result<CreateProductServiceResponseDto>> {
        const product = new Product(
            new ProductID( await this.idGenerator.generateId()), 
            new ProductName(data.name));
        const result = await this.productRepository.saveProductAggregate(product);
        if ( !result.isSuccess() ){
            return Result.fail<CreateProductServiceResponseDto>( result.Error, result.StatusCode, result.Message )
        }
        const response: CreateProductServiceResponseDto = {
            id: product.id.id,
            name: product.Name.name,
        };
        return Result.success<CreateProductServiceResponseDto>(response, 200);
    }
}