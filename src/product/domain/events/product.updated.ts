import { DomainEvent } from "../../../core/domain/domain.event";
import { CategoryName } from "../value-objects/category.name";
import { ProductCurrency } from "../value-objects/product.currency";
import { ProductDescription } from "../value-objects/product.description";
import { ProductID } from "../value-objects/product.id";
import { ProductImage } from "../value-objects/product.image";
import { ProductName } from "../value-objects/product.name";
import { ProductPrice } from "../value-objects/product.price";
import { ProductStock } from "../value-objects/product.stock";
import { ProductWeight } from "../value-objects/product.weight";

export class productUpdatedEvent extends DomainEvent{
    constructor(
        public id: ProductID,
        public name: ProductName,
        public description: ProductDescription,
        public image: ProductImage,
        public price: ProductPrice,
        public currency: ProductCurrency,
        public weight: ProductWeight,
        public stock: ProductStock,
        public category: CategoryName
    ){
        super()
    }
}