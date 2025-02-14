import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { ProductPostgresRepository } from '../repositories/postgres/product.repository';
import { DataSource } from 'typeorm';
import { createProductService } from '../../../product/application/commands/create-product.service';
import { getProductByIdService } from '../../../product/application/queries/get-productById.service';
import { FindPaginatedProductDto } from '../dto/find-paginated-product.dto';
import { GetPaginatedProductService } from '../../../product/application/queries/get-paginatedProduct.service';
import { MessagingService } from '../../../core/infrastructure/events/rabbitmq/messaging.service';
import { DomainEvent } from '../../../core/domain/domain.event';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infraestructure/guard/guard.service';
import { UseGuards } from '@nestjs/common';
import { CategoryValidatorService } from '../../../category/application/services/category-validator.services';
import { DiscountValidatorService } from '../../../discount/application/services/discount-validator.services';
import { CategoryPostgresRepository } from '../../../category/infraestructure/repositories/postgres/category.repository';
import { DiscountPostgresRepository } from '../../../discount/infraestructure/repositories/postgres/discount.repository';
import { IImageHandler } from 'src/core/application/image.handler/image.handler';
import { ImageUrlGenerator } from 'src/core/infrastructure/image.url.generator/image.url.generator';
import { LoggerDecoratorService } from 'src/core/application/aspects/logger.decorator';
import { PerformanceDecoratorService } from 'src/core/application/aspects/performance.decorator';
import { AuditDecoratorService } from 'src/core/application/aspects/audit.decorator';
import { ExceptionDecoratorService } from 'src/core/application/aspects/exception.decorator';
import { AuditPostgresRepository } from 'src/audit/infrastructure/repositories/postgres/audit.repository';
import { Request } from '@nestjs/common';


@ApiTags('Product')
@ApiBearerAuth('JWT-auth')
@Controller('product')
export class ProductController {
  private readonly productRepository: ProductPostgresRepository;
  private readonly auditRepository: AuditPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  private readonly categoryValidator: CategoryValidatorService;
  private readonly discountValidator?: DiscountValidatorService;
  private readonly imageHandler: IImageHandler;
  
  constructor(@Inject('DataSource') private readonly dataSource: DataSource, private readonly messagingService: MessagingService<DomainEvent>) {
    this.uuidCreator = new UuidGenerator();
    this.productRepository = new ProductPostgresRepository(this.dataSource);
    this.auditRepository = new AuditPostgresRepository(this.dataSource)
    this.categoryValidator = new CategoryValidatorService(new CategoryPostgresRepository(this.dataSource));
    this.imageHandler = new ImageUrlGenerator();
    if (dataSource.getRepository(DiscountValidatorService)) {
      this.discountValidator = new DiscountValidatorService(new DiscountPostgresRepository(this.dataSource));
    }
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createProduct(@Body() createProductDto: CreateProductDto, @Request() req) {
    const user = req.user; 
    const userId = user.userId; 
    const service = new ExceptionDecoratorService (
      new AuditDecoratorService (
        this.auditRepository, this.uuidCreator, userId, "createProductService", new LoggerDecoratorService(
          "createProductService", new PerformanceDecoratorService(new createProductService(
            this.productRepository, this.uuidCreator, this.imageHandler, this.messagingService, this.categoryValidator, this.discountValidator)))));
    return await service.execute(createProductDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  async findOne(@Param('id') id: string, @Request() req): Promise<any> { 
    const user = req.user; 
    const userId = user.userId; 
    const service = new ExceptionDecoratorService (
      new AuditDecoratorService (
        this.auditRepository, this.uuidCreator, userId, "getProductByIdService", new LoggerDecoratorService(
          "getProductByIdService", new PerformanceDecoratorService(new getProductByIdService(
            this.productRepository, this.imageHandler)))));

    var response = await service.execute({id:id})
    return response.Value;
  } 

  @UseGuards(JwtAuthGuard)
  @Get('many')
  async findPaginatedProduct(@Query(ValidationPipe) query: FindPaginatedProductDto, @Request() req) {
    const {page, perpage, name, category} = query;
    const user = req.user; 
    const userId = user.userId; 
    const service = new ExceptionDecoratorService (
      new AuditDecoratorService (
        this.auditRepository, this.uuidCreator, userId, "GetPaginatedProductService", new LoggerDecoratorService(
          "GetPaginatedProductService", new PerformanceDecoratorService(new GetPaginatedProductService(
            this.productRepository, this.imageHandler)))));
    return (await service.execute({page, perpage, name, category})).Value.products;
  }
}
