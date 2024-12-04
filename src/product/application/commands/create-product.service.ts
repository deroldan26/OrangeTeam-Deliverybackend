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
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';
import { DomainEvent } from "../../../core/domain/domain.event";
import { MessagingService } from "../../../core/infrastructure/events/rabbitmq/messaging.service";
import { DiscountValidatorService } from '../../../discount/application/services/discount-validator.services';
import { CategoryValidatorService } from "src/category/application/services/category-validator.services";
import { ProductMeasuerement } from "src/product/domain/value-objects/product.measurement";
import { ProductCaducityDate } from "src/product/domain/value-objects/product.caducityDate";

export class createProductService implements IApplicationService<CreateProductServiceEntryDto, CreateProductServiceResponseDto>{
    constructor(
        private readonly productRepository:IProductRepository,
        private readonly idGenerator: IdGenerator<string>,
        private readonly messagingService: MessagingService<DomainEvent>,   
        private readonly categoryValidator: CategoryValidatorService,
        private readonly discountValidator?: DiscountValidatorService
    ){}
    
    async execute(data: CreateProductServiceEntryDto): Promise<Result<CreateProductServiceResponseDto>> {

        const validationCategoryResult = await this.categoryValidator.validateCategoryIds(data.categories);

        if (!validationCategoryResult.isSuccess()) {
            return Result.fail<CreateProductServiceResponseDto>(validationCategoryResult.Error, validationCategoryResult.StatusCode, validationCategoryResult.Message);
        }

        let validationDiscountResult;
        if(data.discount){//!Validacion de ID discount si exite
            validationDiscountResult = await this.discountValidator.validateDiscountId(data.discount);
            if (!validationDiscountResult.isSuccess()) {
                return Result.fail<CreateProductServiceResponseDto>(validationDiscountResult.Error, validationDiscountResult.StatusCode, validationDiscountResult.Message);
            }
        }

        const imageUrlGenerator = new ImageUrlGenerator();
        const imageIDs = await Promise.all(data.images.map(image => imageUrlGenerator.UploadImage(image)));
        const productImages = imageIDs.map(imageID => new ProductImage(imageID));
        const discount = data.discount && validationDiscountResult?.Value ? validationDiscountResult.Value : "";
        const product = new Product(
            new ProductID( await this.idGenerator.generateId()), 
            new ProductName(data.name),
            new ProductDescription(data.description),
            productImages,
            new ProductPrice(data.price),
            new ProductCurrency(data.currency),
            new ProductWeight(data.weight),
            new ProductMeasuerement(data.measurement),
            new ProductStock(data.stock),
            validationCategoryResult.Value,
            data.caducityDate ? new ProductCaducityDate(data.caducityDate) : new ProductCaducityDate(new Date('2050/01/01')),
            discount
        );
        const result = await this.productRepository.saveProductAggregate(product);
        if ( !result.isSuccess() ){
            return Result.fail<CreateProductServiceResponseDto>( result.Error, result.StatusCode, result.Message )
        }
        const response: CreateProductServiceResponseDto = {
            id: product.Id.Id,
            name: product.Name.Name,
            description: product.Description.Description,
            images: product.Images.map(image => image.Image),
            price: product.Price.Price,
            currency: product.Currency.Currency,
            weight: product.Weight.Weight,
            measurement: product.Measurement.Measurement,
            stock: product.Stock.Stock,
            caducityDate: product.CaducityDate ? product.CaducityDate.CaducityDate : new Date('2050/01/01'),
            categories: product.Categories.map(category => category.Id),
            discount
        };
        await this.messagingService.sendMessage('productCreatedEvent', product.pullDomainEvent());
        return Result.success<CreateProductServiceResponseDto>(response, 200);
    }
}