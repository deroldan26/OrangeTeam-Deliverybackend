import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { CreateComboServiceEntryDto } from "../dtos/entry/create-combo-entry.service.dto";
import { Result } from "../../../core/domain/result-handler/result";
import { CreateComboServiceResponseDto } from "../dtos/response/create-combo-response.service.dto";
import { IComboRepository } from "../../domain/repositories/combo-repositories.interface";
import { IdGenerator } from "../../../core/application/id.generator/id.generator";
import { Combo } from "../../domain/combo";
import { ComboID } from "../../domain/value-objects/combo.id";
import { ComboName } from "../../domain/value-objects/combo.name";
import { ComboDescription } from "../../domain/value-objects/combo.description";
import { ComboImage } from "../../domain/value-objects/combo.image";
import { ComboSpecialPrice } from "../../domain/value-objects/combo.specialPrice";
import { ComboCurrency } from "../../domain/value-objects/combo.currency";
import { ProductValidatorService } from "../../../product/application/services/product-validator.services";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';
import { CategoryValidatorService } from "src/category/application/services/category-validator.services";
import { ComboWeight } from "src/combo/domain/value-objects/combo.weight";
import { ComboMeasurement } from "src/combo/domain/value-objects/combo.measurement";
import { ComboStock } from "src/combo/domain/value-objects/combo.stock";
import { ComboCaducityDate } from "src/combo/domain/value-objects/combo.caducityDate";
import { DiscountValidatorService } from '../../../discount/application/services/discount-validator.services';

export class createComboService implements IApplicationService<CreateComboServiceEntryDto, CreateComboServiceResponseDto> {

    constructor(
        private readonly comboRepository: IComboRepository,
        private readonly idGenerator: IdGenerator<string> ,
        private readonly productValidator: ProductValidatorService,
        private readonly categoryValidator: CategoryValidatorService,
        private readonly discountValidator?: DiscountValidatorService
    ) {}

    async execute(data: CreateComboServiceEntryDto): Promise<Result<CreateComboServiceResponseDto>> {
        
            //!Validacion de los ID productos si exiten
            const validationProductResult = await this.productValidator.validateProductIds(data.products);

            if (!validationProductResult.isSuccess()) {
                return Result.fail<CreateComboServiceResponseDto>(validationProductResult.Error, validationProductResult.StatusCode, validationProductResult.Message);
            }

            //!Validacion de los ID categoria si exiten
            const validationCategoryResult = await this.categoryValidator.validateCategoryIds(data.categories);

            if (!validationCategoryResult.isSuccess()) {
                return Result.fail<CreateComboServiceResponseDto>(validationCategoryResult.Error, validationCategoryResult.StatusCode, validationCategoryResult.Message);
            }

            let validationDiscountResult;
            if(data.discount){//!Validacion de ID discount si exite
                validationDiscountResult = await this.discountValidator.validateDiscountId(data.discount);
                if (!validationDiscountResult.isSuccess()) {
                    return Result.fail<CreateComboServiceResponseDto>(validationDiscountResult.Error, validationDiscountResult.StatusCode, validationDiscountResult.Message);
                }
            }

            const imageUrlGenerator = new ImageUrlGenerator();
            const imageIDs = await Promise.all(data.comboImages.map(image => imageUrlGenerator.UploadImage(image)));
            const comboImages = imageIDs.map(imageID => new ComboImage(imageID));
            const discount = data.discount && validationDiscountResult?.Value ? validationDiscountResult.Value : "";

            const combo = new Combo(
                new ComboID(await this.idGenerator.generateId()),
                new ComboName(data.name),
                new ComboDescription(data.description),
                comboImages,
                new ComboSpecialPrice(data.specialPrice),
                new ComboCurrency(data.currency),
                validationProductResult.Value,
                new ComboWeight(data.weight),
                new ComboMeasurement(data.measurement),
                new ComboStock(data.stock),
                data.caducityDate ? new ComboCaducityDate(data.caducityDate) : new ComboCaducityDate(new Date('2050-01-01')),
                validationCategoryResult.Value,
                discount
            );

            const result = await this.comboRepository.saveComboAggregate(combo);
            if (!result.isSuccess()) {
                return Result.fail<CreateComboServiceResponseDto>(result.Error, result.StatusCode, result.Message);
            }
            
            const response: CreateComboServiceResponseDto = {
                id: combo.Id.Id,
                name: combo.Name.Name,
                specialPrice: combo.SpecialPrice.Price,
                currency: combo.Currency.Currency,
                description: combo.Description.Description,
                comboImages: combo.ComboImages.map(image => image.Image),
                products: combo.Products.map(product => product.Id),
                weight: combo.Weight.Weight,
                measurement: combo.Measurement.Measurement,
                stock: combo.Stock.Stock,
                caducityDate: combo.CaducityDate ? combo.CaducityDate.CaducityDate : new Date('2050-01-01'),
                categories: combo.Categories.map(category => category.Id),
                discount

            };

            return Result.success<CreateComboServiceResponseDto>(response, 200);
    }
}
