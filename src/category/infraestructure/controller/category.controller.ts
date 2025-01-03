import { Controller, Get, Post, Body, Inject, ValidationPipe, Query, Param } from '@nestjs/common';
import { CreateCategoryDto } from '../dto/create-category.dto';
import { ApiTags } from '@nestjs/swagger';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { CategoryPostgresRepository } from '../repositories/postgres/category.repository';
import { DataSource } from 'typeorm';
import { createCategoryService } from '../../../category/application/commands/create-category.service';
import { FindPaginatedCategoryDto } from '../dto/find-paginated-category.dto';
import { GetPaginatedCategoryService } from '../../../category/application/queries/get-paginatedCategory.service';
import { getCategoryByIdService } from 'src/category/application/queries/get-categoryById.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infraestructure/guard/guard.service';
import { UseGuards } from '@nestjs/common';
import { ImageUrlGenerator } from 'src/core/infrastructure/image.url.generator/image.url.generator';


@ApiTags('Category')
@ApiBearerAuth('JWT-auth')
@Controller('category')
export class CategoryController {
  private readonly categoryRepository: CategoryPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  private readonly imageHandler: ImageUrlGenerator;
  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.categoryRepository = new CategoryPostgresRepository(this.dataSource);
    this.imageHandler = new ImageUrlGenerator();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createCategory(@Body() createCategoryDto: CreateCategoryDto) {
    const service = new createCategoryService(this.categoryRepository, this.uuidCreator, this.imageHandler);
    return await service.execute(createCategoryDto);
  }
  
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneCategory(@Param('id') id: string) {
    const service = new getCategoryByIdService(this.categoryRepository, this.imageHandler)
    var response = await service.execute({id:id})
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findPaginatedCategory(@Query(ValidationPipe) query: FindPaginatedCategoryDto) {
    const {page, take} = query;
    const service = new GetPaginatedCategoryService(this.categoryRepository, this.imageHandler);
    return (await service.execute({page, take})).Value;
  }
}