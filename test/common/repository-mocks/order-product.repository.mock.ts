import { Result } from "../../../src/core/domain/result-handler/result";
import { IOrderRepository } from "../../../src/order/domain/repositories/order-repositories.interface";
import { Order } from "../../../src/order/domain/order";
import { IOrderProductsRepository } from "../../../src/order/domain/repositories/order-products-repositories.interface";
import { IOrderCombosRepository } from "../../../src/order/domain/repositories/order-combos-repositories.interface";
import { ProductID } from "../../../src/product/domain/value-objects/product.id";
import { Combo } from "../../../src/order/domain/entities/combo";
import { Product } from "../../../src/order/domain/entities/product";

export class OrderProductRepositoryMock implements IOrderProductsRepository {

    private readonly orders: Order[] = [];

    async findOrderProductById(id: string): Promise<Result<Product[]>> {
        throw new Error(`Not implemented`);
    }

    async saveOrderProductEntity(products: Product[]): Promise<Result<Product[]>> {
        throw new Error(`Not implemented`);
    }

    static create(){
        return new OrderProductRepositoryMock();
    }
}