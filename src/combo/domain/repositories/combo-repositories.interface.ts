import { Result } from '../../../core/domain/result-handler/result';
import { Combo } from '../combo';

export interface IComboRepository {
  findComboById(id: string): Promise<Result<Combo>>;
  saveComboAggregate(combo: Combo): Promise<Result<Combo>>;
  findPaginatedCombos(page: number, take: number,filters: {category?: string[]; name?: string; price?: number; discount?: string;}): Promise<Result<Combo[]>>;
}