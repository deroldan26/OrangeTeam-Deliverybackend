import { UuidGenerator } from "../../../src/core/infrastructure/id.generator.ts/uuid-generator";
import { Product } from "../../../src/product/domain/product";
import { ProductID } from "../../../src/product/domain/value-objects/product.id";
import { ProductImage } from "../../../src/product/domain/value-objects/product.image";
import { ProductName } from "../../../src/product/domain/value-objects/product.name";
import { ProductPrice } from "../../../src/product/domain/value-objects/product.price";
import { ProductStock } from "../../../src/product/domain/value-objects/product.stock";
import { ProductDescription } from "../../../src/product/domain/value-objects/product.description";
import { ProductCurrency } from "../../../src/product/domain/value-objects/product.currency";
import { ProductCaducityDate } from "../../../src/product/domain/value-objects/product.caducityDate";
import { ProductMeasuerement } from "../../../src/product/domain/value-objects/product.measurement";
import { ProductWeight } from "../../../src/product/domain/value-objects/product.weight";
import { DiscountID } from "../../../src/discount/domain/value-objects/discount.id";
import { CategoryID } from "../../../src/category/domain/value-objects/category.id";

export class ProductMock {

    static async getProductMock(): Promise<Product> {
        const idGenerator = new UuidGenerator();

        const product = new Product(
            new ProductID( await idGenerator.generateId()), 
            new ProductName("Product Name"),
            new ProductDescription("Product Description"),
            [new ProductImage("www.imagenGenerica.com")],
            new ProductPrice(100),
            new ProductCurrency("USD"),
            new ProductWeight(100),
            new ProductMeasuerement("Kg"),
            new ProductStock(100),
            [new CategoryID(await idGenerator.generateId())],
            new ProductCaducityDate(new Date('2050/01/01')),
            new DiscountID(await idGenerator.generateId())
        );
        return product;
    }

    static create(){
        return new ProductMock();
    }
}