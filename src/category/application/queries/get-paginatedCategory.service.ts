import { IApplicationService } from "../../../core/application/service/application-service.interface";
import { GetPaginatedCategoryServiceEntryDto } from "../dtos/entry/get-paginated-category-entry.service";
import { GetPaginatedCategoryServiceResponseDto } from "../dtos/response/get-paginated-category-response.service";
import { ICategoryRepository } from "../../domain/repositories/category-repositories.interface";
import { Result } from "../../../core/domain/result-handler/result";
import { Category } from "../../domain/category";
import { ImageUrlGenerator } from '../../../core/infrastructure/image.url.generator/image.url.generator';
import { IImageHandler } from "src/core/application/image.handler/image.handler";

export class GetPaginatedCategoryService implements IApplicationService<GetPaginatedCategoryServiceEntryDto, GetPaginatedCategoryServiceResponseDto>{
    constructor(
        private readonly categoryRepository: ICategoryRepository,
        private readonly imageHandler: IImageHandler
    ){}

    async execute(data: GetPaginatedCategoryServiceEntryDto): Promise<Result<GetPaginatedCategoryServiceResponseDto>> {
        const category: Result<Category[]> = await this.categoryRepository.findPaginatedCategory(data.page,data.take);

        if(!category.isSuccess){
            return Result.fail(category.Error, category.StatusCode, category.Message);
        }

        const urlGenerator = new ImageUrlGenerator();
        const response: GetPaginatedCategoryServiceResponseDto = {
            categories: category.Value.map(category => ({
                id: category.Id.Id,
                name: category.Name.Name,
                image: category.Image.Image
            }))
        }

        for (let i = 0; i < response.categories.length; i++) {
            response.categories[i].image = await this.imageHandler.generateImage(response.categories[i].image);
        }
        
        return Result.success(response,200);
    }
}