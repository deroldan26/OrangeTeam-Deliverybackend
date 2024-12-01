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


@ApiTags('Order')
@Controller('order')
export class OrderController{
    private readonly orderRepository: OrderPostgresRepository;
    private readonly paymentRepository: PaymentMethodPostgresRepository;
    private readonly reportRepository: ReportPostgresRepository;
    private readonly uuidCreator: UuidGenerator;

    constructor(@Inject('DataSource') private readonly dataSource: DataSource, private readonly messagingService: MessagingService<DomainEvent>) {
        this.uuidCreator = new UuidGenerator();
        this.orderRepository = new OrderPostgresRepository(this.dataSource);
        this.paymentRepository = new PaymentMethodPostgresRepository(this.dataSource);
        this.reportRepository = new ReportPostgresRepository(this.dataSource);
    }

    @Post()
    async createOrder(@Body() createOrderDto: CreateOrderDto) {
        const service = new createOrderService(this.orderRepository, this.paymentRepository, this.reportRepository, this.uuidCreator, this.messagingService);
        return await service.execute(createOrderDto);
    }

    // @Get(':id')
    // async findOne(@Param('id') id: string) {
    //     const service = new getProductByIdService(this.productRepository)
    //     var response = await service.execute({id:id})
    //     return response;
    // }

    // @Get()
    // async findPaginatedProduct(@Query(ValidationPipe) query: FindPaginatedProductDto) {
    //     const {page, take, name, category} = query;
    //     const service = new GetPaginatedProductService(this.productRepository);
    //     return (await service.execute({page, take, name, category})).Value;
    // }
}