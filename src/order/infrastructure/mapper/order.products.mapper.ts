import { IMapper } from "../../../core/application/mapper/mapper.interface";
import { OrderID } from "src/order/domain/value-objects/order.id";
import { Product } from "src/order/domain/entities/product";
import { OrderProductEntity } from "../models/order.products.entity";
import { OrderProductID } from "src/order/domain/value-objects/order.product.id";
import { OrderProductQuantity } from "src/order/domain/value-objects/order.product.quantity";

export class OrderProductMapper implements IMapper<Product, OrderProductEntity> {

    //Aqui está el error
    async fromDomainToPersistence(domain: Product): Promise<OrderProductEntity> {
        const productORM = new OrderProductEntity();
        productORM.id = domain.Id.ProductId;
        productORM.quantity = domain.ProductQuantity().ProductQuantity;
        productORM.orderId = domain.ProductOrder().Id
        return productORM;
    }
    async fromPersistenceToDomain(persistence: OrderProductEntity): Promise<Product> {
        return new Product(new OrderProductID(persistence.id), 
            new OrderProductQuantity(persistence.quantity),
            new OrderID(persistence.orderId),
        );
    }
  }