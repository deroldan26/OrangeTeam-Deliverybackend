import { IMapper } from "src/core/application/mapper/mapper.interface";
import { Product } from "src/product/domain/product";
import { ProductEntity } from "../models/postgres/product.entity";
import { ProductID } from "src/product/domain/value-objects/product.id";
import { ProductName } from "src/product/domain/value-objects/product.name";

export class ProductMapper implements IMapper<Product, ProductEntity> {
    async fromDomainToPersistence(domain: Product): Promise<ProductEntity> {
      const productORM = new ProductEntity();
      productORM.id = domain.Id.Id;
      productORM.name = domain.Name.Name;
      return productORM;
    }
    async fromPersistenceToDomain(persistence: ProductEntity): Promise<Product> {
      return new Product(new ProductID(persistence.id), new ProductName(persistence.name));
    }
  }