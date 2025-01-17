import { Result } from "../../../src/core/domain/result-handler/result";
import { IOrderRepository } from "../../../src/order/domain/repositories/order-repositories.interface";
import { Order } from "../../../src/order/domain/order";
import { IOrderProductsRepository } from "../../../src/order/domain/repositories/order-products-repositories.interface";
import { IOrderCombosRepository } from "../../../src/order/domain/repositories/order-combos-repositories.interface";
import { ProductID } from "../../../src/product/domain/value-objects/product.id";

export class OrderRepositoryMock implements IOrderRepository {

    private readonly orders: Order[] = [];

    async findOrderById(id: string): Promise<Result<Order>> {
        try{
            for (let i = 0; i < this.orders.length; i++) {
                const user = this.orders[i];
                if (user.Id.Id == id) {
                    return Result.success<Order>(user, 200)
                }
            }
            throw new Error(`User with ID ${id} not found`);
        }catch(error){
            return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
    }

    async findPaginatedOrders(page: number, take: number, status?: string, user?:string): Promise<Result<Order[]>>{
        let response: Order[] = [];
        try{
            for (let i = 0; i < this.orders.length; i++) {
                const order = this.orders[i];
                if (order.UserID.UserId == user) {
                    response.push(order);
                }
            }
            return Result.success<Order[]>(response, 200);
        }catch(error){
            return Result.fail<Order[]>(new Error(error.message), error.code, error.message);
        }
    }

    async saveOrderAggregate(order: Order): Promise<Result<Order>> {
        this.orders.push(order);
        return Result.success<Order>(order, 200);
    }

    static create(){
        return new OrderRepositoryMock();
    }
}