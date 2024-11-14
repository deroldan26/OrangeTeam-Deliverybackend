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

export class createComboService implements IApplicationService<CreateComboServiceEntryDto, CreateComboServiceResponseDto> {

    constructor(
        private readonly comboRepository: IComboRepository,
        private readonly idGenerator: IdGenerator<string> ,
        private readonly productValidator: ProductValidatorService  
    ) {}

    async execute(data: CreateComboServiceEntryDto): Promise<Result<CreateComboServiceResponseDto>> {
        
            //!Validacion de los ID productos si exiten
            const validationResult = await this.productValidator.validateProductIds(data.products);

            if (!validationResult.isSuccess()) {
                return Result.fail<CreateComboServiceResponseDto>(validationResult.Error, validationResult.StatusCode, validationResult.Message);
            }


            const combo = new Combo(
                new ComboID(await this.idGenerator.generateId()),
                new ComboName(data.name),
                new ComboDescription(data.description),
                new ComboImage(data.comboImage),
                new ComboSpecialPrice(data.specialPrice),
                new ComboCurrency(data.currency),
                validationResult.Value
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
                comboImage: combo.ComboImage.Image,
                products: combo.Products.map(product => product.Id),
            };

            return Result.success<CreateComboServiceResponseDto>(response, 200);
    }
}
