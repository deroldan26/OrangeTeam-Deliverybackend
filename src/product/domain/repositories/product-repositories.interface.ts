import { Result } from 'src/core/domain/result-handler/result';
import { Product } from '../product';

export interface IProductRepository {
  findProductById(id: string): Promise<Result<Product>>;
  saveProductAggregate(product: Product): Promise<Result<Product>>;
}