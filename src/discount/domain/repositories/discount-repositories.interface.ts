import { Result } from '../../../core/domain/result-handler/result';
import { Discount } from '../discount';

export interface IDiscountRepository {
  findDiscountById(id: string): Promise<Result<Discount>>;
  findPaginatedDiscount(page: number, perpage: number): Promise<Result<Discount[]>>;
  saveDiscountAggregate(category: Discount): Promise<Result<Discount>>;
}