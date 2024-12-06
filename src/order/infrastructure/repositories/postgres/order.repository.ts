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
import { OrderProductMapper } from "../../mapper/order.products.mapper";
import { OrderComboMapper } from "../../mapper/order.combos.mapper";
import { OrderProductID } from "src/order/domain/value-objects/order.product.id";
import { OrderProductQuantity } from "src/order/domain/value-objects/order.product.quantity";
import { OrderID } from "src/order/domain/value-objects/order.id";
import { OrderComboQuantity } from "src/order/domain/value-objects/order.combo.quantity";
import { OrderComboID } from "src/order/domain/value-objects/order.combo.id";

export class OrderPostgresRepository extends Repository<OrderORM> implements IOrderRepository{
    private readonly orderMapper: OrderMapper;
    private readonly orderProductMapper: OrderProductMapper;
    private readonly orderComboMapper: OrderComboMapper;
    private readonly paymentMethodRepository: IPaymentRepository;
    private readonly reportRepository: IReportRepository;
    private readonly orderProductRepository: IOrderProductsRepository;
    private readonly orderComboProductRepository: IOrderCombosRepository;

    constructor(dataSource: DataSource){
        super(OrderORM, dataSource.createEntityManager());
        this.orderMapper = new OrderMapper();
        this.orderProductMapper = new OrderProductMapper();
        this.orderComboMapper = new OrderComboMapper();
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
                'Order.cancelledDate',
                'Order.shippedDate',
                'Order.beingProcessedDate',
                'Order.indications',
                'Order.userId',
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

    async findPaginatedOrders(page: number, take: number, status?: string, user?:string): Promise<Result<Order[]>> {
        try {
            const query = this.createQueryBuilder('Order')
            .leftJoinAndSelect('Order.paymentMethod', 'paymentMethod')
            .leftJoinAndSelect('Order.report', 'report')
            .select([
                'Order.orderId',
                'Order.createdDate',
                'Order.status',
                'Order.address',
                'Order.receivedDate',
                'Order.cancelledDate',
                'Order.shippedDate',
                'Order.beingProcessedDate',
                'Order.indications',
                'Order.userId',
                'paymentMethod.id',
                'paymentMethod.amount',
                'paymentMethod.currency',
                'paymentMethod.paymentMethodName',
                'report.id',
                'report.description',
                'report.reportDate'
            ]);

        if (status) {
            query.andWhere('Order.status LIKE :status', { status: `%${status}%` });
        }
        if (user) {
            query.andWhere('Order.userId = :user', { user });
        }

        const orders = await query.skip((page - 1) * take).take(take).getMany();
        let response: Order[] = [];
        for (const order of orders) {
            const products = await this.orderProductRepository.findOrderProductById(order.orderId);
            const combos = await this.orderComboProductRepository.findOrderComboById(order.orderId);
            response.push(await this.orderMapper.fromPersistenceToDomainOrder(order, products.Value, combos.Value));
        }

        return Result.success<Order[]>(response, 200);
        
        } catch (error) {
            return Result.fail<Order[]>(new Error(error.message), error.code, error.message);
        }
    }

    async saveOrderAggregate(order: Order): Promise<Result<Order>> {
        try {
            const newOrder = await this.orderMapper.fromDomainToPersistence(order);
            await this.save(newOrder);
            return Result.success<Order>(order, 200);
        } catch (error) {
            return Result.fail<Order>(new Error(error.message), error.code, error.message);
        }
    }

}