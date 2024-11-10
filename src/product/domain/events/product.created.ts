import { DomainEvent } from "../../../core/domain/domain.event";
import { ProductID } from "../value-objects/product.id";
import { ProductName } from "../value-objects/product.name";
import { ProductImage } from "../value-objects/product.image";
import { ProductDescription } from "../value-objects/product.description";
import { ProductWeight } from "../value-objects/product.weight";
import { ProductPrice } from "../value-objects/product.price";
import { ProductCurrency } from "../value-objects/product.currency";

export class productCreatedEvent extends DomainEvent{
    protected constructor(
        public id: ProductID,
        public name: ProductName,
        public description: ProductDescription,
        public image: ProductImage,
        public price: ProductPrice,
        public currency: ProductCurrency,
        public weight: ProductWeight
    ){
        super()
    }
    static create(id: ProductID, name: ProductName, description: ProductDescription, image: ProductImage, price: ProductPrice, currency: ProductCurrency, weight: ProductWeight): productCreatedEvent{
        return new productCreatedEvent(id, name, description, image, price, currency, weight);
    }
}