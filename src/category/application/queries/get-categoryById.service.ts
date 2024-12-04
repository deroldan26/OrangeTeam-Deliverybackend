import { IApplicationService } from "src/core/application/service/application-service.interface";
import { GetCategoryByIdServiceEntryDto } from "../dtos/entry/get-categoryById-entry.service.dto";
import { GetCategoryByIdServiceResponseDto } from "../dtos/response/get-category-response.service.dto";
import { ICategoryRepository } from "src/category/domain/repositories/category-repositories.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Category } from "src/category/domain/category";
import { ImageUrlGenerator } from "src/core/infrastructure/image.url.generator/image.url.generator";

export class getCategoryByIdService implements IApplicationService<GetCategoryByIdServiceEntryDto, GetCategoryByIdServiceResponseDto>{

    constructor(
        private readonly categoryRepository: ICategoryRepository
    ){}
    
    async execute(data: GetCategoryByIdServiceEntryDto): Promise<Result<GetCategoryByIdServiceResponseDto>> {
        
        const category: Result<Category> = await this.categoryRepository.findCategoryById(data.id);
        if(!category.isSuccess()) {
            return Result.fail( category.Error, category.StatusCode, category.Message )
        }
        const urlGenerator = new ImageUrlGenerator();
        const url = await urlGenerator.generateUrl(category.Value.Image.Image);
        const response: GetCategoryByIdServiceResponseDto = {
            id: category.Value.Id.Id,
            name: category.Value.Name.Name,
            image: url 
        };

        return Result.success(response, 200);
    }
}