import { Entity } from "src/core/domain/entity";
import { OrderComboID } from "../value-objects/order.combo.id";
import { OrderComboQuantity } from "../value-objects/order.combo.quantity";

export class Combo extends Entity<OrderComboID>{

    constructor(id: OrderComboID, private quantity: OrderComboQuantity) {
        super(id);
    }

    ComboQuantity(): OrderComboQuantity{
        return this.quantity;
    }

}