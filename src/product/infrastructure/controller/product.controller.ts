import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query } from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { ApiTags } from '@nestjs/swagger';
import { UuidGenerator } from 'src/core/infrastructure/id.generator.ts/uuid-generator';
import { ProductPostgresRepository } from '../repositories/postgres/product.repository';
import { DataSource } from 'typeorm';
import { createProductService } from 'src/product/application/commands/create-product.service';
import { getProductByIdService } from 'src/product/application/queries/get-productById.service';
import { FindPaginatedProductDto } from '../dto/find-paginated-product.dto';
import { GetPaginatedProductService } from 'src/product/application/queries/get-paginatedProduct.service';

//import { cloudinary } from 'src/core/infrastructure/cloudinary/cloudinary';

const cloudinary = require('../../../../cloudinary/cloudinary');

@ApiTags('Product')
@Controller('product')
export class ProductController {
  private readonly productRepository: ProductPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.productRepository = new ProductPostgresRepository(this.dataSource);
  }

  @Post()
  async createProduct(@Body() createProductDto: CreateProductDto) {
    const service = new createProductService(this.productRepository, this.uuidCreator);
    return await service.execute(createProductDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = new getProductByIdService(this.productRepository)
    var response = await service.execute({id:id})
    response.Value.image = cloudinary.url(response.Value.image)
    return response;
  }

  @Get()
  async findPaginatedProduct(@Query(ValidationPipe) query: FindPaginatedProductDto) {
    const {page, take} = query;
    const service = new GetPaginatedProductService(this.productRepository);
    return (await service.execute({page, take})).Value;
  }

  @Get('image/:id')
  async GetImage(@Param('id') id: string) {

    const url = cloudinary.url(id)

    console.log(url);

    return url;

    // const uploadResult = await cloudinary.uploader
    //    .upload(
    //        'https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg', {
    //            public_id: 'shoes',
    //        }
    //    )
    //    .catch((error) => {
    //        console.log(error);
    //    });
    
    // console.log(uploadResult);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
  //   return this.productService.update(+id, updateProductDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.productService.remove(+id);
  // }
}
