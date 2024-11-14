import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetPaginatedComboServiceEntryDto } from "../dtos/entry/get-paginated-combo-entry.service";
import { GetPaginatedComboServiceResponseDto } from "../dtos/response/get-paginated-combo-response.service";
import { IComboRepository } from "../../domain/repositories/combo-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Product } from "../../../product/domain/product";
import { Combo } from "../../../combo/domain/combo";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';
import { ComboID } from "src/combo/domain/value-objects/combo.id";

export class GetPaginatedComboService implements IApplicationService<GetPaginatedComboServiceEntryDto, GetPaginatedComboServiceResponseDto>{
    constructor(private readonly comboRepository: IComboRepository){}

    async execute(data: GetPaginatedComboServiceEntryDto): Promise<Result<GetPaginatedComboServiceResponseDto>> {
        const combo: Result<Combo[]> = await this.comboRepository.findPaginatedCombos(data.page,data.take);

        if(!combo.isSuccess){
            return Result.fail(combo.Error, combo.StatusCode, combo.Message);
        }

        const urlGenerator = new ImageUrlGenerator();
        const response: GetPaginatedComboServiceResponseDto = {
            combos: combo.Value.map(combo => ({
                id: combo.Id.Id,
                name: combo.Name.Name,
                specialPrice: combo.SpecialPrice.Price,
                currency: combo.Currency.Currency,
                description: combo.Description.Description,
                comboImage: combo.ComboImage.Image,
                Products: combo.Products.map(ComboID => ComboID.Id)
            }))
        }

        for (let i = 0; i < response.combos.length; i++) {
            response.combos[i].comboImage = await urlGenerator.generateUrl(response.combos[i].comboImage);
        }
        
        return Result.success(response,200);
    }
}