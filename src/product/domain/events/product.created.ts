import { DomainEvent } from "../../../core/domain/domain.event";
import { ProductID } from "../value-objects/product.id";
import { ProductName } from "../value-objects/product.name";
import { ProductImage } from "../value-objects/product.image";
import { ProductDescription } from "../value-objects/product.description";
import { ProductWeight } from "../value-objects/product.weight";
import { ProductPrice } from "../value-objects/product.price";
import { ProductCurrency } from "../value-objects/product.currency";
import { ProductStock } from "../value-objects/product.stock";
import { CategoryName } from "../value-objects/category.name";
import { ProductMeasuerement } from "../value-objects/product.measurement";
import { ProductCaducityDate } from "../value-objects/product.caducityDate";
import { DiscountID } from "src/discount/domain/value-objects/discount.id";
import { CategoryID } from "src/category/domain/value-objects/category.id";

export class productCreatedEvent extends DomainEvent{
    protected constructor(
        public id: ProductID,
        public name: ProductName,
        public description: ProductDescription,
        public images: ProductImage[],
        public price: ProductPrice,
        public currency: ProductCurrency,
        public weight: ProductWeight,
        public measurement: ProductMeasuerement,
        public stock: ProductStock,
        public categories: CategoryID[],
        public caducityDate?: ProductCaducityDate,
        public discount?: DiscountID
    ){
        super()
    }
    static create(id: ProductID, name: ProductName, description: ProductDescription, images: ProductImage[], price: ProductPrice, currency: ProductCurrency, weight: ProductWeight, measurement: ProductMeasuerement,stock: ProductStock, categories:CategoryID[], caducityDate: ProductCaducityDate, discount: DiscountID): productCreatedEvent{
        return new productCreatedEvent(id, name, description, images, price, currency, weight, measurement,stock, categories, caducityDate, discount);
    }
}