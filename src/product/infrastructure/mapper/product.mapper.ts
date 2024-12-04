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
import { ProductMeasuerement } from "src/product/domain/value-objects/product.measurement";
import { ProductCaducityDate } from "src/product/domain/value-objects/product.caducityDate";
import { CategoryID } from "src/category/domain/value-objects/category.id";
import { DiscountID } from "src/discount/domain/value-objects/discount.id";

export class ProductMapper implements IMapper<Product, ProductEntity> {
    async fromDomainToPersistence(domain: Product): Promise<ProductEntity> {
      const productORM = new ProductEntity();
      productORM.id = domain.Id.Id;
      productORM.name = domain.Name.Name;
      productORM.description = domain.Description.Description;
      productORM.images = domain.Images.map(image => image.Image);
      productORM.price = domain.Price.Price;
      productORM.currency = domain.Currency.Currency;
      productORM.weight = domain.Weight.Weight
      productORM.measurement = domain.Measurement.Measurement;
      productORM.stock = domain.Stock.Stock;
      productORM.caducityDate = domain.CaducityDate ? domain.CaducityDate.CaducityDate : new Date('2050-01-01');
      productORM.categories = domain.Categories.map(category => category.Id);
      productORM.discount = domain.Discount ? domain.Discount.Id : "";
      return productORM;
    }
    async fromPersistenceToDomain(persistence: ProductEntity): Promise<Product> {
      return new Product(
        new ProductID(persistence.id), 
        new ProductName(persistence.name), 
        new ProductDescription(persistence.description), 
        persistence.images.map(imageUrl => new ProductImage(imageUrl)),
        new ProductPrice(persistence.price), 
        new ProductCurrency(persistence.currency),
        new ProductWeight(persistence.weight),
        new ProductMeasuerement(persistence.measurement),
        new ProductStock(persistence.stock),       
        persistence.categories.map(categoryId => new CategoryID(categoryId)),
        persistence.caducityDate ? new ProductCaducityDate(persistence.caducityDate) : new ProductCaducityDate(new Date('2050/01/01')),
        persistence.discount ? new DiscountID(persistence.discount) : new DiscountID(""), 
      );
    }
  }