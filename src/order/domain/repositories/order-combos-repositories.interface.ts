import { Result } from '../../../core/domain/result-handler/result';
import { Combo } from '../entities/combo';

export interface IOrderCombosRepository {
  findOrderById(id: string): Promise<Result<Combo[]>>;
  saveOrderComboAggregate(combos: Combo[]): Promise<Result<Combo[]>>;
}