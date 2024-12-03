import { Result } from '../../../core/domain/result-handler/result';
import { Product } from '../entities/product';

export interface IOrderProductsRepository {
  findOrderById(id: string): Promise<Result<Product[]>>;
  saveOrderProductAggregate(products: Product[]): Promise<Result<Product[]>>;
}