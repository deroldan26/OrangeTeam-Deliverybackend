import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { IProductRepository } from "../../domain/repositories/product-repositories.interface";
import { DomainEvent } from "../../../core/domain/domain.event";
import { MessagingService } from "../../../core/infrastructure/events/rabbitmq/messaging.service";
import { DeleteProductServiceEntryDto } from "../dtos/entry/delete-product-entry.service.dto";
import { DeleteProductServiceResponseDto } from "../dtos/response/delete-product-response.service.dto";
import { productDeletedEvent } from "src/product/domain/events/product.deleted";
import { UpdateProductServiceEntryDto } from "../dtos/entry/update-product-entry.service.dto";
import { UpdateProductServiceResponseDto } from "../dtos/response/update-product-response.service.dto";
import { ProductName } from "src/product/domain/value-objects/product.name";
import { productUpdatedEvent } from "src/product/domain/events/product.updated";
import { ProductDescription } from "src/product/domain/value-objects/product.description";
import { ProductImage } from "src/product/domain/value-objects/product.image";
import { ProductPrice } from "src/product/domain/value-objects/product.price";
import { ProductCurrency } from "src/product/domain/value-objects/product.currency";
import { ProductWeight } from "src/product/domain/value-objects/product.weight";
import { ProductStock } from "src/product/domain/value-objects/product.stock";
import { CategoryName } from "src/product/domain/value-objects/category.name";

export class updateProductService implements IApplicationService<UpdateProductServiceEntryDto, UpdateProductServiceResponseDto>{
    constructor(
        private readonly productRepository:IProductRepository,
        private readonly messagingService: MessagingService<DomainEvent>   
    ){}
    
    async execute(data: UpdateProductServiceEntryDto): Promise<Result<UpdateProductServiceResponseDto>> {

        const result = await this.productRepository.findProductById(data.id);
        if (!result.isSuccess()){
            return Result.fail<UpdateProductServiceResponseDto>(result.Error, result.StatusCode, result.Message)
        }
        //i should create the new product with the new data
        const product = result.Value;
        if (data.name) product.ChangeName(new ProductName(data.name));
        if (data.description) product.ChangeDescription(new ProductDescription(data.description));
        if (data.image) product.ChangeImage(new ProductImage(data.image));
        if (data.price) product.ChangePrice(new ProductPrice(data.price));
        if (data.currency) product.ChangeCurrency(new ProductCurrency(data.currency));
        if (data.weight) product.ChangeWeight(new ProductWeight(data.weight));
        if (data.stock) product.ChangeStock(new ProductStock(data.stock));
        if (data.category) product.ChangeCategory(new CategoryName(data.category));

        const update = await this.productRepository.saveProductAggregate(product);
        if (!update.isSuccess()){
            return Result.fail<UpdateProductServiceResponseDto>(update.Error, update.StatusCode, update.Message)
        }
        const response: UpdateProductServiceResponseDto = {
            id: update.Value.Id.Id,
            name: update.Value.Name.Name,
            description: update.Value.Description.Description,
            image: update.Value.Image.Image,
            price: update.Value.Price.Price,
            currency: update.Value.Currency.Currency,
            weight: update.Value.Weight.Weight,
            stock: update.Value.Stock.Stock,
            category: update.Value.Category.Name
        };
        await this.messagingService.sendMessage('productUpdateEvent', new productUpdatedEvent(result.Value.Id, result.Value.Name, result.Value.Description, result.Value.Image, result.Value.Price, result.Value.Currency, result.Value.Weight, result.Value.Stock, result.Value.Category));
        return Result.success<UpdateProductServiceResponseDto>(response, 200);
    }
}