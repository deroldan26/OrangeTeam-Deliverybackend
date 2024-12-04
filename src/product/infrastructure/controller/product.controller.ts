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

@ApiTags('Product')
@ApiBearerAuth('JWT-auth')
@Controller('product')
export class ProductController {
  private readonly productRepository: ProductPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  private readonly 
  private readonly categoryValidator: CategoryValidatorService;
  private readonly discountValidator?: DiscountValidatorService;
  
  constructor(@Inject('DataSource') private readonly dataSource: DataSource, private readonly messagingService: MessagingService<DomainEvent>) {
    this.uuidCreator = new UuidGenerator();
    this.productRepository = new ProductPostgresRepository(this.dataSource);
    this.categoryValidator = new CategoryValidatorService(new CategoryPostgresRepository(this.dataSource));
    if (dataSource.getRepository(DiscountValidatorService)) {
      this.discountValidator = new DiscountValidatorService(new DiscountPostgresRepository(this.dataSource));
    }
  }

  // @UseGuards(JwtAuthGuard)
  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const service = new createProductService(this.productRepository, this.uuidCreator, this.messagingService, this.categoryValidator, this.discountValidator);
    return await service.execute(createProductDto);
  }

  //@UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = new getProductByIdService(this.productRepository)
    var response = await service.execute({id:id})
    return response;
  }

  //@UseGuards(JwtAuthGuard)
  @Get()
  async findPaginatedProduct(@Query(ValidationPipe) query: FindPaginatedProductDto) {
    const {page, take, name, category} = query;
    const service = new GetPaginatedProductService(this.productRepository);
    return (await service.execute({page, take, name, category})).Value;
  }

  // @Get('image/:id')
  // async GetImage(@Param('id') id: string) {
  //   const urlGenerator = new ImageUrlGenerator();
  //   const url = await urlGenerator.generateUrl(id);
  //   return url;
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
