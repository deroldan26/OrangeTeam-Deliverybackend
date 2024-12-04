import { Result } from '../../../core/domain/result-handler/result';
import { Category } from '../category';

export interface ICategoryRepository {
  findCategoryById(id: string): Promise<Result<Category>>;
  saveCategoryAggregate(category: Category): Promise<Result<Category>>;
  findPaginatedCategory(page: number, take: number): Promise<Result<Category[]>>;
}