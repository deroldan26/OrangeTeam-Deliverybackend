import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { DiscountPostgresRepository } from "../repositories/postgres/discount.repository";
import { UuidGenerator } from "src/core/infrastructure/id.generator.ts/uuid-generator";
import { DataSource } from "typeorm";
import { CreateDiscountDto } from "../dto/create-discount.dto";
import { createDiscountService } from "src/discount/application/commands/create-discount.service";
import { getDiscountByIdService } from "src/discount/application/queries/get-discountById.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/infraestructure/guard/guard.service";
import { UseGuards } from "@nestjs/common";


@ApiTags('Discount')
@ApiBearerAuth('JWT-auth')
@Controller('discount')
export class DiscountController {
  private readonly discountRepository: DiscountPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.discountRepository = new DiscountPostgresRepository(this.dataSource);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post()
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    const service = new createDiscountService(this.discountRepository, this.uuidCreator);
    return await service.execute(createDiscountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async findOneCategory(@Param('id') id: string) {
    const service = new getDiscountByIdService(this.discountRepository)
    var response = await service.execute({id:id})
    return response;
  }
}