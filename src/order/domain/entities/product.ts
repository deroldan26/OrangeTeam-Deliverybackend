import { Entity } from "src/core/domain/entity";
import { OrderProductID } from "../value-objects/order.product.id";
import { OrderProductQuantity } from "../value-objects/order.product.quantity";

export class Product extends Entity<OrderProductID>{

    constructor(id: OrderProductID, private quantity: OrderProductQuantity) {
        super(id);
    }

    ProductQuantity(): OrderProductQuantity{
        return this.quantity;
    }

}