import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { Combo } from "src/order/domain/entities/combo";
import { OrderComboEntity } from "../models/order.combos.entity";
import { OrderComboQuantity } from "src/order/domain/value-objects/order.combo.quantity";
import { OrderComboID } from "src/order/domain/value-objects/order.combo.id";
import { OrderID } from "src/order/domain/value-objects/order.id";

export class OrderComboMapper implements IMapper<Combo, OrderComboEntity> {

    async fromDomainToPersistence(domain: Combo): Promise<OrderComboEntity> {
        const comboORM = new OrderComboEntity();
        comboORM.id = domain.Id.ComboId;
        comboORM.quantity = domain.ComboQuantity().ProductQuantity;
        comboORM.orderId = domain.ComboOrder().Id
        return comboORM;
    }
    async fromPersistenceToDomain(persistence: OrderComboEntity): Promise<Combo> {
        return new Combo(new OrderComboID(persistence.id), 
            new OrderComboQuantity(persistence.quantity),
            new OrderID(persistence.orderId));
    }
  }