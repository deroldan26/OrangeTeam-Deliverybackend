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
    
  async findProductById(id: string): Promise<Result<Product>> {
    try {
      const product = await this.createQueryBuilder('Product').select(['Product.id','Product.name','Product.description','Product.image',,'Product.price','Product.currency','Product.weight']).where('Product.id = :id',{id}).getOne()
      const getProduct = await this.productMapper.fromPersistenceToDomain(product);
      return Result.success<Product>(getProduct, 200)
    } catch (error) {
      console.log(error.message);
      return Result.fail<Product>(new Error(error.message), error.code, error.message);
    }
  }

  async findPaginatedProducts(page: number, take: number): Promise<Result<Product[]>>{
    try {
      const skip = page * take - take;
      const products = await this.createQueryBuilder('Product').select(['Product.id','Product.name','Product.description','Product.image',,'Product.price','Product.currency','Product.weight']).skip(skip).take(take).getMany();
      const response = await Promise.all(products.map(product => this.productMapper.fromPersistenceToDomain(product)));
      return Result.success<Product[]>(response,200)
    } catch (error) {
      return Result.fail(error, 400, error.message);
    }
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