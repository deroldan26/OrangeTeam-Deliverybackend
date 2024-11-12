import { Controller, Post, Body, Inject } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateComboDto } from '../dto/create-combo.dto';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { ComboPostgresRepository } from '../repositories/postgres/combo.repository';
import { createComboService } from '../../../combo/application/commands/create-combo.service';
import { DataSource } from 'typeorm';

@ApiTags('Combo')
@Controller('combo')
export class ComboController {
  private readonly comboRepository: ComboPostgresRepository;
  private readonly uuidCreator: UuidGenerator;

  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.comboRepository = new ComboPostgresRepository(this.dataSource);
  }

  @Post()
  async createCombo(@Body() createComboDto: CreateComboDto) {
    const service = new createComboService(this.comboRepository, this.uuidCreator);
    return await service.execute(createComboDto);
  }
}
