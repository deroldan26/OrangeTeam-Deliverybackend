import { AggregateRoot } from "src/core/domain/aggregate.root";
import { ProductID } from "./value-objects/product.id";
import { DomainEvent } from "src/core/domain/domain.event";
import { productCreatedEvent } from "./events/product.created";
import { ProductName } from "./value-objects/product.name";
import { ProductDescription } from "./value-objects/product.description";
import { unvalidProductException } from "./exceptions/unvalid.product";
import { ProductImage } from "./value-objects/product.image";
import { ProductCurrency } from "./value-objects/product.currency";
import { ProductPrice } from "./value-objects/product.price";
import { ProductWeight } from "./value-objects/product.weight";


export class Product extends AggregateRoot<ProductID>{
    
    private name: ProductName
    private description: ProductDescription
    private image: ProductImage
    private price: ProductPrice
    private currency: ProductCurrency
    private weight: ProductWeight

    get Name (): ProductName
    {
        return this.name
    }

    get Description (): ProductDescription
    {
        return this.description
    }

    get Image (): ProductImage
    {
        return this.image
    }

    get Price (): ProductPrice
    {
        return this.price
    }

    get Currency (): ProductCurrency
    {
        return this.currency
    }

    get Weight (): ProductWeight
    {
        return this.weight
    }
    
    constructor(id: ProductID, name: ProductName, description: ProductDescription, image: ProductImage, price: ProductPrice, currency: ProductCurrency, weight: ProductWeight){
        const productCreated = productCreatedEvent.create(id, name, description, image, price, currency, weight);
        super(id, productCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof productCreatedEvent) {
            this.name = event.name;
            this.description = event.description;
            this.image = event.image;
            this.price = event.price;
            this.currency = event.currency;
            this.weight = event.weight;
          }
    }
    protected checkValidState (): void{
        if ( !this.name || !this.description || !this.image || !this.price || !this.currency || !this.weight )
            throw new unvalidProductException(`Product not valid`)
    }
}