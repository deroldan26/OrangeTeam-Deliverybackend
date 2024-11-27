import { DomainEvent } from "../../../core/domain/domain.event";
import { ProductID } from "../value-objects/product.id";
import { ProductName } from "../value-objects/product.name";

export class productDeletedEvent extends DomainEvent{
    constructor(
        public id: ProductID,
        public name: ProductName
    ){
        super()
    }
}