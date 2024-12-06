import { Result } from '../../../core/domain/result-handler/result';
import { Cupon } from '../cupon';

export interface ICuponRepository {
  findCuponById(id: string): Promise<Result<Cupon>>;
  saveCuponAggregate(cupon: Cupon): Promise<Result<Cupon>>;
}