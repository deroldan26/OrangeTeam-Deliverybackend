import { DataSource, Repository } from "typeorm";
import { OrderEntity as OrderORM } from "../../models/order.entity";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Order } from "src/order/domain/order";
import { OrderMapper } from "../../mapper/order.mapper";

export class OrderPostgresRepository extends Repository<OrderORM> implements IOrderRepository{
    private readonly orderMapper: OrderMapper;

    constructor(dataSource: DataSource){
        super(OrderORM, dataSource.createEntityManager());
        this.orderMapper = new OrderMapper();
    }

    findOrderById(id: string): Promise<Result<Order>> {
        try {
            
        } catch (error) {
            //return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
        throw new Error("Method not implemented.");
    }

    findPaginatedOrders(page: number, take: number, status?: string): Promise<Result<Order[]>> {
        try {
            
        } catch (error) {
            //return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
        throw new Error("Method not implemented.");
    }

    async saveOrderAggregate(order: Order): Promise<Result<Order>> {
        try {
            const newOrder = await this.orderMapper.fromDomainToPersistence(order);
            console.log("NewOrder:************")
            console.log(newOrder)
            // const savedPaymentMethod = await paymentMethodRepository.save(newOrder.paymentMethod);
            // newOrder.paymentMethod.id = savedPaymentMethod.id;
            // const savedReport = await reportRepository.save(newOrder.report);
            // newOrder.report.id = savedReport.id;

            await this.save(newOrder);
            return Result.success<Order>(order, 200);
        } catch (error) {
            console.log("no furula")
            return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
    }

}