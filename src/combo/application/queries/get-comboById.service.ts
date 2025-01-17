import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetComboByIdServiceEntryDto } from "../dtos/entry/get-comboById-entry.service.dto";
import { GetComboByIdServiceResponseDto } from "../dtos/response/get-combo-response.service.dto";
import { IComboRepository } from "../../domain/repositories/combo-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Product } from "../../../product/domain/product";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';
import { Combo } from "src/combo/domain/combo";
import { ProductID } from "src/product/domain/value-objects/product.id";
import { CategoryID } from "src/category/domain/value-objects/category.id";
import { IImageHandler } from "src/core/application/image.handler/image.handler";

export class getComboByIdService implements IApplicationService<GetComboByIdServiceEntryDto, GetComboByIdServiceResponseDto>{

    constructor(
        private readonly comboRepository:IComboRepository,
        private readonly imageHandler: IImageHandler
    ){}
    
    async execute(data: GetComboByIdServiceEntryDto): Promise<Result<GetComboByIdServiceResponseDto>> {
        
        const combo: Result<Combo> = await this.comboRepository.findComboById(data.id);
        if(!combo.isSuccess()) {
            return Result.fail( combo.Error, combo.StatusCode, combo.Message )
        }

        const urls = await Promise.all(combo.Value.ComboImages.map(image => this.imageHandler.generateImage(image.Image)));
        const response: GetComboByIdServiceResponseDto = {
            id: combo.Value.Id.Id,
            name: combo.Value.Name.Name,
            price: combo.Value.SpecialPrice.Price,
            currency: combo.Value.Currency.Currency,
            description: combo.Value.Description.Description,
            images: urls,           
            products: combo.Value.Products.map(ProductID => ProductID.Id),
            weight: combo.Value.Weight.Weight,
            measurement: combo.Value.Measurement.Measurement,
            stock: combo.Value.Stock.Stock,
            caducityDate: combo.Value.CaducityDate ? combo.Value.CaducityDate.CaducityDate : new Date('2050-01-01'),
            categories: combo.Value.Categories.map(CategoryID => CategoryID.Id),
            discount: combo.Value.Discount ? combo.Value.Discount.Id : "",
        };
        return Result.success(response, 200);
    }
}