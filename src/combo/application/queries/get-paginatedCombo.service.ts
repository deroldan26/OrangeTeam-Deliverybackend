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
        const { category, name, price, discount, page, take } = data;
        const combo: Result<Combo[]> = await this.comboRepository.findPaginatedCombos(data.page,data.take,{ category, name, price, discount});

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
                comboImages: combo.ComboImages.map(image => image.Image),
                products: combo.Products.map(ComboID => ComboID.Id),
                weight: combo.Weight.Weight,
                measurement: combo.Measurement.Measurement,
                stock: combo.Stock.Stock,
                caducityDate: combo.CaducityDate ? combo.CaducityDate.CaducityDate : new Date('2050-01-01'),
                categories: combo.Categories.map(ComboID => ComboID.Id),
                discount: combo.Discount ? combo.Discount.Id : ""
            }))
        }

        for (let i = 0; i < response.combos.length; i++) {
            response.combos[i].comboImages = await Promise.all(
                response.combos[i].comboImages.map(async (image) => await urlGenerator.generateUrl(image))
            );    
        }
        
        return Result.success(response,200);
    }
}