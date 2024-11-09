import { DomainEvent } from "src/core/domain/domain.event";
import { ProductID } from "../value-objects/product.id";
import { ProductName } from "../value-objects/product.name";

export class productCreatedEvent extends DomainEvent{
    protected constructor(
        public id: ProductID,
        public name: ProductName,
        //public description: string,
        //public weight: string,
        //public price: number,
        //public currency: string
    ){
        super()
    }
    static create(id: ProductID, name: ProductName): productCreatedEvent{
        return new productCreatedEvent(id, name);
    }
}