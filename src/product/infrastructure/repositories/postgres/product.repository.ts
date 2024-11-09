import { Result } from 'src/core/domain/result-handler/result';
import { Product } from 'src/product/domain/product';
import { IProductRepository } from 'src/product/domain/repositories/product-repositories.interface';
import { ProductEntity as ProductORM } from 'src/product/infrastructure/models/postgres/product.entity';
import { DataSource, Repository } from "typeorm";
import { ProductMapper } from '../../mapper/product.mapper';

export class ProductPostgresRepository extends Repository<ProductORM> implements IProductRepository{
  private readonly productMapper: ProductMapper;

  constructor(dataSource: DataSource) {
    super(ProductORM, dataSource.createEntityManager());
    this.productMapper = new ProductMapper();
  }
    
  findProductById(id: string): Promise<Result<Product>> {
    throw new Error('Method not implemented.');
  }
  
  async saveProductAggregate(product: Product): Promise<Result<Product>> {
    try {
      const newProduct = await this.productMapper.fromDomainToPersistence(product);
      await this.save(newProduct);
      return Result.success<Product>(product, 200);
    } catch (error) {
      return Result.fail<Product>(new Error(error.message), error.code, error.message);
    }
  }
}