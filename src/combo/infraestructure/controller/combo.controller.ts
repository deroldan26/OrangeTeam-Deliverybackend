import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateComboDto } from '../dto/create-combo.dto';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { ComboPostgresRepository } from '../repositories/postgres/combo.repository';
import { createComboService } from '../../../combo/application/commands/create-combo.service';
import { DataSource } from 'typeorm';
import { ProductPostgresRepository } from '../../../product/infrastructure/repositories/postgres/product.repository';
import { ProductValidatorService } from 'src/product/application/services/product-validator.services';

@ApiTags('Combo')
@Controller('combo')
export class ComboController {
  private readonly comboRepository: ComboPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  private readonly productValidator: ProductValidatorService;

  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.comboRepository = new ComboPostgresRepository(this.dataSource);
    this.productValidator = new ProductValidatorService(new ProductPostgresRepository(this.dataSource));
  }

  @Post()
  async createCombo(@Body() createComboDto: CreateComboDto) {
    const service = new createComboService(this.comboRepository, this.uuidCreator, this.productValidator);
    return await service.execute(createComboDto);
  }
}
