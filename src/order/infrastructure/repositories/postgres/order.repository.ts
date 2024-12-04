import { DataSource, Repository } from "typeorm";
import { OrderEntity as OrderORM } from "../../models/order.entity";
import { IOrderRepository } from "src/order/domain/repositories/order-repositories.interface";
import { Result } from "src/core/domain/result-handler/result";
import { Order } from "src/order/domain/order";
import { OrderMapper } from "../../mapper/order.mapper";
import { ReportPostgresRepository } from "./report.repository";
import { PaymentMethodPostgresRepository } from "./payment.repository";
import { IPaymentRepository } from "src/order/domain/repositories/payment-repositories.interface";
import { IReportRepository } from "src/order/domain/repositories/report-repositories.interface";
import { IOrderProductsRepository } from "src/order/domain/repositories/order-products-repositories.interface";
import { IOrderCombosRepository } from "src/order/domain/repositories/order-combos-repositories.interface";
import { OrderProductPostgresRepository } from "./products.repository";
import { OrderComboPostgresRepository } from "./combos.repository";
import { Product } from "src/order/domain/entities/product";
import { Combo } from "src/order/domain/entities/combo";

export class OrderPostgresRepository extends Repository<OrderORM> implements IOrderRepository{
    private readonly orderMapper: OrderMapper;
    private readonly paymentMethodRepository: IPaymentRepository;
    private readonly reportRepository: IReportRepository;
    private readonly orderProductRepository: IOrderProductsRepository;
    private readonly orderComboProductRepository: IOrderCombosRepository;

    constructor(dataSource: DataSource){
        super(OrderORM, dataSource.createEntityManager());
        this.orderMapper = new OrderMapper();
        this.paymentMethodRepository = new PaymentMethodPostgresRepository(dataSource);
        this.reportRepository = new ReportPostgresRepository(dataSource);
        this.orderProductRepository = new OrderProductPostgresRepository(dataSource);
        this.orderComboProductRepository = new OrderComboPostgresRepository(dataSource)
    }

    async findOrderById(id: string): Promise<Result<Order>> {
        try {
            var order = await this.createQueryBuilder('Order')
            .leftJoinAndSelect('Order.paymentMethod', 'paymentMethod')
            .leftJoinAndSelect('Order.report', 'report')
            .select([
                'Order.orderId',
                'Order.createdDate',
                'Order.status',
                'Order.address',
                'Order.receivedDate',
                'paymentMethod.id',
                'paymentMethod.amount',
                'paymentMethod.currency',
                'paymentMethod.paymentMethodName',
                'report.id',
                'report.description',
                'report.reportDate'
            ]).where('Order.orderId = :id',{id}).getOne()
            if(!order) 
                return Result.fail<Order>(new Error('Order not found'), 404, 'Order not found');
            var products = await this.orderProductRepository.findOrderProductById(order.orderId);
            var combos = await this.orderComboProductRepository.findOrderComboById(order.orderId);
            const getOrder = await this.orderMapper.fromPersistenceToDomainOrder(order,products.Value,combos.Value);
            return Result.success<Order>(getOrder, 200)
        } catch (error) {
            return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
    }

    async findPaginatedOrders(page: number, take: number, status?: string): Promise<Result<Order[]>> {
        try {
            
        } catch (error) {
            return Result.fail<Order[]>(new Error(error.message), error.code, error.message);
        }
        throw new Error("Method not implemented.");
    }

    async saveOrderAggregate(order: Order): Promise<Result<Order>> {
        try {
            const newOrder = await this.orderMapper.fromDomainToPersistence(order);
            await this.save(newOrder);
            return Result.success<Order>(order, 200);
        } catch (error) {
            console.log("no furula")
            return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
    }

}