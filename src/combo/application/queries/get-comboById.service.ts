import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetComboByIdServiceEntryDto } from "../dtos/entry/get-comboById-entry.service.dto";
import { GetComboByIdServiceResponseDto } from "../dtos/response/get-combo-response.service.dto";
import { IComboRepository } from "../../domain/repositories/combo-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Product } from "../../../product/domain/product";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';
import { Combo } from "src/combo/domain/combo";
import { ProductID } from "src/product/domain/value-objects/product.id";

export class getComboByIdService implements IApplicationService<GetComboByIdServiceEntryDto, GetComboByIdServiceResponseDto>{

    constructor(
        private readonly comboRepository:IComboRepository
    ){}
    
    async execute(data: GetComboByIdServiceEntryDto): Promise<Result<GetComboByIdServiceResponseDto>> {
        
        const combo: Result<Combo> = await this.comboRepository.findComboById(data.id);
        if(!combo.isSuccess()) {
            return Result.fail( combo.Error, combo.StatusCode, combo.Message )
        }
        const urlGenerator = new ImageUrlGenerator();
        const url = await urlGenerator.generateUrl(combo.Value.ComboImage.Image);
        const response: GetComboByIdServiceResponseDto = {
            id: combo.Value.Id.Id,
            name: combo.Value.Name.Name,
            specialPrice: combo.Value.SpecialPrice.Price,
            currency: combo.Value.Currency.Currency,
            description: combo.Value.Description.Description,
            comboImage: url,           
            Products: combo.Value.Products.map(ProductID => ProductID.Id)
        };
        return Result.success(response, 200);
    }
}