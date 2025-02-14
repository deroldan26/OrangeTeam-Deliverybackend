import { Entity } from "../../../core/domain/entity";
import { OrderComboID } from "../value-objects/order.combo.id";
import { OrderComboQuantity } from "../value-objects/order.combo.quantity";
import { OrderID } from "../value-objects/order.id";

export class Combo extends Entity<OrderComboID>{

    constructor(id: OrderComboID, private quantity: OrderComboQuantity, private order: OrderID) {
        super(id);
    }

    ComboQuantity(): OrderComboQuantity{
        return this.quantity;
    }

    ComboOrder(): OrderID{
        return this.order;
    }

}