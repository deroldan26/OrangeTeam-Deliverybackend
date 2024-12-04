import { Result } from '../../../core/domain/result-handler/result';
import { Product } from '../entities/product';

export interface IOrderProductsRepository {
  findOrderProductById(id: string): Promise<Result<Product[]>>;
  saveOrderProductEntity(products: Product[]): Promise<Result<Product[]>>;
}