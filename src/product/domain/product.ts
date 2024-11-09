import { AggregateRoot } from "src/core/domain/aggregate.root";
import { ProductID } from "./value-objects/product.id";
import { DomainEvent } from "src/core/domain/domain.event";
import { productCreatedEvent } from "./events/product.created";
import { ProductName } from "./value-objects/product.name";
import { ProductDescription } from "./value-objects/product.description";
import { unvalidProductException } from "./exceptions/unvalid.product";


export class Product extends AggregateRoot<ProductID>{
    
    private name: ProductName
    private description: ProductDescription

    get Name (): ProductName
    {
        return this.Name
    }

    get Description (): ProductDescription
    {
        return this.Description
    }
    
    constructor(id: ProductID, name: ProductName/*, description: ProductDescription*/){
        const productCreated = productCreatedEvent.create(id, name)
        super(id, productCreated);
    }

    // static create(id: ProductID, name: ProductName){
    //     return new Product(id, name)
    // }
    
    protected when(event: DomainEvent): void {
        if (event instanceof productCreatedEvent) {
            this.name = event.name;
            //this.description = event.description;
          }
    }
    protected checkValidState (): void{
        if ( !this.name /*|| !this.description*/ )
            throw new unvalidProductException(`Product not valid`)
    }
}