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

@ApiTags('Product')
@Controller('product')
export class ProductController {
  private readonly productRepository: ProductPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  
  constructor(@Inject('DataSource') private readonly dataSource: DataSource, private readonly messagingService: MessagingService<DomainEvent>) {
    this.uuidCreator = new UuidGenerator();
    this.productRepository = new ProductPostgresRepository(this.dataSource);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const service = new createProductService(this.productRepository, this.uuidCreator, this.messagingService);
    return await service.execute(createProductDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = new getProductByIdService(this.productRepository)
    var response = await service.execute({id:id})
    return response;
  }

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
