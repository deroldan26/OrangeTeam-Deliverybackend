import { Result } from '../../../../core/domain/result-handler/result';
import { Product } from '../../../domain/product';
import { IProductRepository } from '../../../domain/repositories/product-repositories.interface';
import { ProductEntity as ProductORM } from '../../../infrastructure/models/postgres/product.entity';
import { DataSource, Repository } from "typeorm";
import { ProductMapper } from '../../mapper/product.mapper';

//const cloudinary = require('../../../../cloudinary/cloudinary');

export class ProductPostgresRepository extends Repository<ProductORM> implements IProductRepository{
  private readonly productMapper: ProductMapper;

  constructor(dataSource: DataSource) {
    super(ProductORM, dataSource.createEntityManager());
    this.productMapper = new ProductMapper();
  }
    
  async findProductById(id: string): Promise<Result<Product>> {
    try {
      var product = await this.createQueryBuilder('Product').select(['Product.id','Product.name','Product.description','Product.images','Product.price','Product.currency','Product.weight','Product.measurement','Product.stock','Product.categories','Product.caducityDate','Product.discount']).where('Product.id = :id',{id}).getOne()
      const getProduct = await this.productMapper.fromPersistenceToDomain(product);
      return Result.success<Product>(getProduct, 200)
    } catch (error) {
      return Result.fail<Product>(new Error(error.message), error.code, error.message);
    }
  }

  async findPaginatedProducts(page: number, take: number, name?: string, category?: string): Promise<Result<Product[]>>{
    try {
      const query = this.createQueryBuilder('Product').select(['Product.id','Product.name','Product.description','Product.images','Product.price','Product.currency','Product.weight','Product.measurement','Product.stock','Product.categories','Product.caducityDate','Product.discount']);
      if(name){
        query.where('Product.name LIKE :name',{name: `%${name}%`});
      }
      if(category){
        query.where('Product.category = :category',{category});
      }
      const skip = page * take - take;
      query.skip(skip).take(take);
      //const products = await this.createQueryBuilder('Product').select(['Product.id','Product.name','Product.description','Product.image','Product.price','Product.currency','Product.weight','Product.stock','Product.category']).skip(skip).take(take).getMany();
      const products = await query.getMany();
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