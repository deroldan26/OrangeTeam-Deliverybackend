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
import { DiscountID } from "src/discount/domain/value-objects/discount.id";
import { CategoryID } from "src/category/domain/value-objects/category.id";

export class Product extends AggregateRoot<ProductID>{
    
    private name: ProductName
    private description: ProductDescription
    private images: ProductImage[]
    private price: ProductPrice
    private currency: ProductCurrency
    private weight: ProductWeight
    private measurement: ProductMeasuerement
    private stock: ProductStock
    private categories: CategoryID[]
    private caducityDate?: ProductCaducityDate
    private discount?: DiscountID

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

    get Measurement (): ProductMeasuerement
    {
        return this.measurement
    }

    get Stock (): ProductStock
    {
        return this.stock
    }

    get Categories (): CategoryID[]
    {
        return this.categories
    }

    get CaducityDate (): ProductCaducityDate
    {
        return this.caducityDate
    }
    
    get Discount(): DiscountID 
    {
        return this.discount;
    }
    
    constructor(
        id: ProductID, 
        name: ProductName, 
        description: ProductDescription, 
        images: ProductImage[], 
        price: ProductPrice, 
        currency: ProductCurrency, 
        weight: ProductWeight, 
        measurement: ProductMeasuerement,
        stock: ProductStock, 
        categories: CategoryID[] = [], 
        caducityDate?: ProductCaducityDate, 
        discount?: DiscountID
    )
    {
        const productCreated = productCreatedEvent.create(id, name, description, images, price, currency, weight, measurement, stock, categories, caducityDate, discount);
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
            this.measurement = event.measurement;
            this.stock = event.stock;
            this.categories = event.categories;
            this.discount = event.discount;
          }
    }
    protected checkValidState (): void{
        if ( !this.name || !this.description || !this.images || !this.price || !this.currency || !this.weight || !this.measurement || !this.stock || !this.categories)
            throw new unvalidProductException(`Product not valid`)
    }
}