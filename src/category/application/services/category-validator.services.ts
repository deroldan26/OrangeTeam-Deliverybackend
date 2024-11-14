import { ICategoryRepository } from "../../../category/domain/repositories/category-repositories.interface";
import { CategoryID } from "../../../category/domain/value-objects/category.id";
import { Result } from "../../../core/domain/result-handler/result";

export class CategoryValidatorService {
    constructor(private readonly categoryRepository: ICategoryRepository) {}

    async validateCategoryIds(categoryIds: string[]): Promise<Result<CategoryID[]>> {
        const validatedCategoryIds: CategoryID[] = [];
        for (const id of categoryIds) {
            const categoryId = new CategoryID(id);
            const result = await this.categoryRepository.findCategoryById(categoryId.Id);

            if (!result.isSuccess()) {
                return Result.fail<CategoryID[]>(
                    new Error(`Category with ID ${id} does not exist`),
                    400,
                    `Invalid category ID: ${id}`
                );
            }
            validatedCategoryIds.push(categoryId);
        }
        return Result.success(validatedCategoryIds, 200);
    }
}
