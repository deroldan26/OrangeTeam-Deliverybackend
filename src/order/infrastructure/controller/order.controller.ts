import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UuidGenerator } from "src/core/infrastructure/id.generator.ts/uuid-generator";
import { OrderPostgresRepository } from "../repositories/postgres/order.repository";
import { DataSource } from "typeorm";
import { DomainEvent } from "src/core/domain/domain.event";
import { createOrderService } from "src/order/application/commands/create-order.service";
import { CreateOrderDto } from "../dto/create-order.dto";
import { MessagingService } from "src/core/infrastructure/events/rabbitmq/messaging.service";
import { ProductValidatorService } from "src/product/application/services/product-validator.services";
import { ComboValidatorService } from "src/combo/application/services/combo-validator.services";
import { ProductPostgresRepository } from "src/product/infrastructure/repositories/postgres/product.repository";
import { PaymentMethodPostgresRepository } from "../repositories/postgres/payment.repository";
import { ReportPostgresRepository } from "../repositories/postgres/report.repository";
import { getOrderByIdService } from "src/order/application/queries/get-orderById.service";
import { OrderProductPostgresRepository } from "../repositories/postgres/products.repository";
import { OrderComboPostgresRepository } from "../repositories/postgres/combos.repository";


@ApiTags('Order')
@Controller('order')
export class OrderController{
    private readonly orderRepository: OrderPostgresRepository;
    private readonly paymentRepository: PaymentMethodPostgresRepository;
    private readonly reportRepository: ReportPostgresRepository;
    private readonly orderProductRepository: OrderProductPostgresRepository;
    private readonly orderComboProductRepository: OrderComboPostgresRepository;
    private readonly uuidCreator: UuidGenerator;

    constructor(@Inject('DataSource') private readonly dataSource: DataSource, private readonly messagingService: MessagingService<DomainEvent>) {
        this.uuidCreator = new UuidGenerator();
        this.orderRepository = new OrderPostgresRepository(this.dataSource);
        this.paymentRepository = new PaymentMethodPostgresRepository(this.dataSource);
        this.reportRepository = new ReportPostgresRepository(this.dataSource);
        this.orderProductRepository= new OrderProductPostgresRepository(this.dataSource);
        this.orderComboProductRepository = new OrderComboPostgresRepository(this.dataSource);
    }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const service = new createOrderService(this.orderRepository, this.paymentRepository, this.reportRepository, this.orderProductRepository, this.orderComboProductRepository, this.uuidCreator, this.messagingService);
        return await service.execute(createOrderDto);
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        const service = new getOrderByIdService(this.orderRepository, this.orderProductRepository, this.orderComboProductRepository);
        var response = await service.execute({id:id})
        return response;
    }

    // @Get()
    // async findPaginatedProduct(@Query(ValidationPipe) query: FindPaginatedOrderDto) {
    //     const {page, take, state} = query;
    //     const service = new GetPaginatedOrderService(this.orderRepository);
    //     return (await service.execute({page, take, state})).Value;
    // }

    // @Patch(':id')
    // async update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    //     const service = new updateOrderService(this.orderRepository, this.messagingService);
    //     var response = await service.execute({id: id, ...updateOrderDto});
    //     return response;
    // }
}