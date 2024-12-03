import { AggregateRoot } from "../../core/domain/aggregate.root";
import { DomainEvent } from "../../core/domain/domain.event";
import { productCreatedEvent } from "./events/product.created";
import { ProductName } from "./value-objects/product.name";
import { ProductDescription } from "./value-objects/product.description";
import { unvalidProductException } from "./exceptions/unvalid.product";
import { ProductImage } from "./value-objects/product.image";
import { ProductCurrency } from "./value-objects/product.currency";
import { ProductPrice } from "./value-objects/product.price";
import { ProductWeight } from "./value-objects/product.weight";
import { ProductMeasuerement } from "./value-objects/product.measurement";
import { ProductCaducityDate } from "./value-objects/product.caducityDate";
import { ProductID } from "./value-objects/product.id";
import { ProductStock } from "./value-objects/product.stock";
import { CategoryName } from "./value-objects/category.name";
//import { DiscountID } from "src/discount/domain/value-objects/discount.id";

export class Product extends AggregateRoot<ProductID>{
    
    private name: ProductName
    private description: ProductDescription
    private images: ProductImage[]
    private price: ProductPrice
    private currency: ProductCurrency
    private weight: ProductWeight
    private measurement: ProductMeasuerement
    private stock: ProductStock
    private category: CategoryName
    private caducityDate: ProductCaducityDate
    //private discount: 

    get Name (): ProductName
    {
        return this.name
    }

    get Description (): ProductDescription
    {
        return this.description
    }

    get Images (): ProductImage[]
    {
        return this.images
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

    get Stock (): ProductStock
    {
        return this.stock
    }

    get Category (): CategoryName
    {
        return this.category
    }
    
    constructor(id: ProductID, name: ProductName, description: ProductDescription, images: ProductImage[], price: ProductPrice, currency: ProductCurrency, weight: ProductWeight, stock: ProductStock, category: CategoryName){
        const productCreated = productCreatedEvent.create(id, name, description, images, price, currency, weight, stock, category);
        
        super(id,productCreated);
    }
    
    protected when(event: DomainEvent): void {
        if (event instanceof productCreatedEvent) {
            this.name = event.name;
            this.description = event.description;
            this.images = event.images;
            this.price = event.price;
            this.currency = event.currency;
            this.weight = event.weight;
            this.stock = event.stock;
            this.category = event.category;
          }
    }
    protected checkValidState (): void{
        if ( !this.name || !this.description || !this.images || !this.price || !this.currency || !this.weight || !this.stock || !this.category)
            throw new unvalidProductException(`Product not valid`)
    }
}