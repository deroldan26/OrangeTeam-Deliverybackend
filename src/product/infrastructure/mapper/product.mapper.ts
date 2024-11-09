import { IMapper } from "src/core/application/mapper/mapper.interface";
import { Product } from "src/product/domain/product";
import { ProductEntity } from "../models/postgres/product.entity";

export class ProductMapper implements IMapper<Product, ProductEntity> {
    async fromDomainToPersistence(domain: Product): Promise<ProductEntity> {
      const productORM = new ProductEntity();
      productORM.id = domain.Id.Id;
      productORM.name = domain.Name.Name;
      return productORM;
    }
    fromPersistenceToDomain(persistence: ProductEntity): Promise<Product> {
      throw new Error('Method not implemented.');
    }
  }