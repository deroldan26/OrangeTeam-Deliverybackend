import { Result } from '../../../core/domain/result-handler/result';
import { Combo } from '../entities/combo';

export interface IOrderCombosRepository {
  findOrderComboById(id: string): Promise<Result<Combo[]>>;
  saveOrderComboEntity(combos: Combo[]): Promise<Result<Combo[]>>;
}