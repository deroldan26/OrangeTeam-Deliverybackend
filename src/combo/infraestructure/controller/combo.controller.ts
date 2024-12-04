import { Controller, Post, Get, Param, Body, Inject, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateComboDto } from '../dto/create-combo.dto';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { ComboPostgresRepository } from '../repositories/postgres/combo.repository';
import { createComboService } from '../../../combo/application/commands/create-combo.service';
import { DataSource } from 'typeorm';
import { ProductPostgresRepository } from '../../../product/infrastructure/repositories/postgres/product.repository';
import { ProductValidatorService } from '../../../product/application/services/product-validator.services';
import { getComboByIdService } from '../../application/queries/get-comboById.service';
import { FindPaginatedComboDto } from '../dto/find-paginated-product.dto';
import { GetPaginatedComboService } from '../../../combo/application/queries/get-paginatedCombo.service';
import { CategoryValidatorService } from 'src/category/application/services/category-validator.services';
import { CategoryPostgresRepository } from 'src/category/infraestructure/repositories/postgres/category.repository';
import { DiscountValidatorService } from 'src/discount/application/services/discount-validator.services';
import { DiscountPostgresRepository } from 'src/discount/infraestructure/repositories/postgres/discount.repository';

@ApiTags('Combo')
@Controller('combo')
export class ComboController {
  private readonly comboRepository: ComboPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  private readonly productValidator: ProductValidatorService;
  private readonly categoryValidator: CategoryValidatorService;
  private readonly discountValidator?: DiscountValidatorService

  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.comboRepository = new ComboPostgresRepository(this.dataSource);
    this.productValidator = new ProductValidatorService(new ProductPostgresRepository(this.dataSource));
    this.categoryValidator = new CategoryValidatorService(new CategoryPostgresRepository(this.dataSource));
    if (dataSource.getRepository(DiscountValidatorService)) {
      this.discountValidator = new DiscountValidatorService(new DiscountPostgresRepository(this.dataSource));
    }
  }

  @Post()
  async createCombo(@Body() createComboDto: CreateComboDto) {
    const service = new createComboService(this.comboRepository, this.uuidCreator, this.productValidator, this.categoryValidator, this.discountValidator);
    return await service.execute(createComboDto);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const service = new getComboByIdService(this.comboRepository)
    var response = await service.execute({id:id})
    return response;
  }

  @Get()
  async findPaginatedCombo(@Query(ValidationPipe) query: FindPaginatedComboDto) {
    // const {page, take} = query;
    const { page, take, category, name, price, discount} = query;
    const service = new GetPaginatedComboService(this.comboRepository);
    return (await service.execute({ page, take, category, name, price, discount })).Value;
  }
}
