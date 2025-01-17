import { Entity } from "../../../../src/core/domain/entity";
import { OrderProductID } from "../value-objects/order.product.id";
import { OrderProductQuantity } from "../value-objects/order.product.quantity";
import { OrderID } from "../value-objects/order.id";

export class Product extends Entity<OrderProductID>{

    constructor(id: OrderProductID, private quantity: OrderProductQuantity, private order: OrderID) {
        super(id);
    }

    ProductQuantity(): OrderProductQuantity{
        return this.quantity;
    }

    ProductOrder(): OrderID{
        return this.order;
    }

}