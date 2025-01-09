import { Body, Controller, Get, Inject, Param, Patch, Post, Query, ValidationPipe } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { UuidGenerator } from "src/core/infrastructure/id.generator.ts/uuid-generator";
import { OrderPostgresRepository } from "../repositories/postgres/order.repository";
import { DataSource } from "typeorm";
import { DomainEvent } from "src/core/domain/domain.event";
import { createOrderService } from "src/order/application/commands/create-order.service";
import { CreateOrderDto } from "../dto/create-order.dto";
import { MessagingService } from "src/core/infrastructure/events/rabbitmq/messaging.service";
import { PaymentMethodPostgresRepository } from "../repositories/postgres/payment.repository";
import { ReportPostgresRepository } from "../repositories/postgres/report.repository";
import { getOrderByIdService } from "src/order/application/queries/get-orderById.service";
import { OrderProductPostgresRepository } from "../repositories/postgres/products.repository";
import { OrderComboPostgresRepository } from "../repositories/postgres/combos.repository";
import { FindPaginatedOrderDto } from "../dto/find-paginated-order.dto";
import { GetPaginatedOrderService } from "src/order/application/queries/get-paginatedOrder.service";
import { updateOrderService } from "src/order/application/commands/update-order.service";
import { UpdateOrderDto } from "../dto/update-order.dto";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/infraestructure/guard/guard.service";
import { UseGuards } from "@nestjs/common";
import { UserPostgresRepository } from "src/user/infrastructure/repositories/postgres/user.repository";
import { Request } from "@nestjs/common";


@ApiTags('Order')
@ApiBearerAuth('JWT-auth')
@Controller('order')
export class OrderController{
    private readonly orderRepository: OrderPostgresRepository;
    private readonly paymentRepository: PaymentMethodPostgresRepository;
    private readonly reportRepository: ReportPostgresRepository;
    private readonly orderProductRepository: OrderProductPostgresRepository;
    private readonly orderComboProductRepository: OrderComboPostgresRepository;
    private readonly userRepository: UserPostgresRepository;
    private readonly uuidCreator: UuidGenerator;

    constructor(@Inject('DataSource') private readonly dataSource: DataSource, private readonly messagingService: MessagingService<DomainEvent>) {
        this.uuidCreator = new UuidGenerator();
        this.orderRepository = new OrderPostgresRepository(this.dataSource);
        this.paymentRepository = new PaymentMethodPostgresRepository(this.dataSource);
        this.reportRepository = new ReportPostgresRepository(this.dataSource);
        this.orderProductRepository= new OrderProductPostgresRepository(this.dataSource);
        this.orderComboProductRepository = new OrderComboPostgresRepository(this.dataSource);
        this.userRepository = new UserPostgresRepository(this.dataSource);
    }

    @UseGuards(JwtAuthGuard)
    @Post('create')
    async createOrder(@Body() createOrderDto: CreateOrderDto,  @Request() req) {
        const user = req.user;
        const userId = user.userId;
        createOrderDto.userId = userId;
        const service = new createOrderService(this.orderRepository, this.paymentRepository, this.reportRepository, this.orderProductRepository, this.orderComboProductRepository, this.uuidCreator, this.messagingService, this.userRepository);
        return (await service.execute(createOrderDto)).Value;
    }

    @UseGuards(JwtAuthGuard)
    @Get('one/:id')
    async findOne(@Param('id') id: string) {
        const service = new getOrderByIdService(this.orderRepository, this.orderProductRepository, this.orderComboProductRepository);
        var response = await service.execute({id:id})
        return response.Value;
    } 

    @UseGuards(JwtAuthGuard)
    @Get('many')
    async findPaginatedOrder(@Query(ValidationPipe) query: FindPaginatedOrderDto, @Request() req) {
        const user_token = req.user;
        const user = user_token.userId;
        const {page, take, status} = query;
        const service = new GetPaginatedOrderService(this.orderRepository, this.orderProductRepository, this.orderComboProductRepository);
        return (await service.execute({page, take, status, user})).Value;
    }

    @UseGuards(JwtAuthGuard)
    @Patch('update/:id')
    async updateOrder(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
        const service = new updateOrderService(this.orderRepository, this.paymentRepository, this.reportRepository, this.orderProductRepository, this.orderComboProductRepository, this.messagingService);
        var response = await service.execute({id: id, ...updateOrderDto});
        return response.Value;
    }
}