import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { Product } from "../../domain/product";
import { ProductEntity } from "../models/postgres/product.entity";
import { ProductID } from "../../domain/value-objects/product.id";
import { ProductName } from "../../domain/value-objects/product.name";
import { ProductDescription } from "../../domain/value-objects/product.description";
import { ProductImage } from "../../domain/value-objects/product.image";
import { ProductPrice } from "../../domain/value-objects/product.price";
import { ProductCurrency } from "../../domain/value-objects/product.currency";
import { ProductWeight } from "../../domain/value-objects/product.weight";
import { ProductStock } from "src/product/domain/value-objects/product.stock";
import { CategoryName } from "src/product/domain/value-objects/category.name";

export class ProductMapper implements IMapper<Product, ProductEntity> {
    async fromDomainToPersistence(domain: Product): Promise<ProductEntity> {
      const productORM = new ProductEntity();
      productORM.id = domain.Id.Id;
      productORM.name = domain.Name.Name;
      productORM.description = domain.Description.Description;
      productORM.image = domain.Image.Image;
      productORM.price = domain.Price.Price;
      productORM.currency = domain.Currency.Currency;
      productORM.weight = domain.Weight.Weight
      productORM.stock = domain.Stock.Stock;
      productORM.category = domain.Category.Name
      
      return productORM;
    }
    async fromPersistenceToDomain(persistence: ProductEntity): Promise<Product> {
      return new Product(new ProductID(persistence.id), 
             new ProductName(persistence.name), 
             new ProductDescription(persistence.description), 
             new ProductImage(persistence.image), 
             new ProductPrice(persistence.price), 
             new ProductCurrency(persistence.currency),
             new ProductWeight(persistence.weight),
             new ProductStock(persistence.stock),
             new CategoryName(persistence.category));
    }
  }