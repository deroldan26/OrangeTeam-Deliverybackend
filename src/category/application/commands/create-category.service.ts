import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { CreateCategoryServiceEntryDto } from "../dtos/entry/create-category-entry.service.dto";
import { Result } from "../../../core/domain/result-handler/result";
import { CreateCategoryServiceResponseDto } from "../dtos/response/create-category-response.service.dto";
import { ICategoryRepository } from "../../domain/repositories/category-repositories.interface";
import { IdGenerator } from "../../../core/application/id.generator/id.generator";
import { Category } from "../../domain/category";
import { CategoryID } from "../../domain/value-objects/category.id";
import { CategoryName } from "../../domain/value-objects/category.name";
import { CategoryImage } from "../../domain/value-objects/category.image";
import { CategoryValidatorService } from "src/category/application/services/category-validator.services";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';

export class createCategoryService implements IApplicationService<CreateCategoryServiceEntryDto, CreateCategoryServiceResponseDto> {

    constructor(
        private readonly categoryRepository: ICategoryRepository,
        private readonly idGenerator: IdGenerator<string> 
    ) {}

    async execute(data: CreateCategoryServiceEntryDto): Promise<Result<CreateCategoryServiceResponseDto>> {
        const imageUrlGenerator = new ImageUrlGenerator();
        const imageID = await imageUrlGenerator.UploadImage(data.image);
        
        const category = new Category(
            new CategoryID(await this.idGenerator.generateId()),
            new CategoryName(data.name),
            new CategoryImage(imageID)
        );

        const result = await this.categoryRepository.saveCategoryAggregate(category);
        if (!result.isSuccess()) {
            return Result.fail<CreateCategoryServiceResponseDto>(result.Error, result.StatusCode, result.Message);
        }
        
        const response: CreateCategoryServiceResponseDto = {
            id: category.Id.Id,
            name: category.Name.Name,
            image: category.Image.Image
        };

        return Result.success<CreateCategoryServiceResponseDto>(response, 200);
    }
}
