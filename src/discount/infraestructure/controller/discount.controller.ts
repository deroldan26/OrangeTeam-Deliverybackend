import { Body, Controller, Get, Inject, Param, Post, Query, ValidationPipe } from "@nestjs/common";
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
import { ImageUrlGenerator } from "src/core/infrastructure/image.url.generator/image.url.generator";
import { FindPaginatedDiscountDto } from "../dto/find-paginated-discount.dto";
import { GetPaginatedDiscountService } from "src/discount/application/queries/get-paginatedDiscount.service";


@ApiTags('Discount')
@ApiBearerAuth('JWT-auth')
@Controller('discount')
export class DiscountController {
  private readonly discountRepository: DiscountPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  private readonly imageHandler: ImageUrlGenerator;
  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.discountRepository = new DiscountPostgresRepository(this.dataSource);
    this.imageHandler = new ImageUrlGenerator();
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createDiscount(@Body() createDiscountDto: CreateDiscountDto) {
    const service = new createDiscountService(this.discountRepository, this.uuidCreator);
    return await service.execute(createDiscountDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  async findOneCategory(@Param('id') id: string) {
    const service = new getDiscountByIdService(this.discountRepository)
    var response = await service.execute({id:id})
    return response.Value;
  }

  @UseGuards(JwtAuthGuard)
  @Get('many')
  async findPaginatedDiscount(@Query(ValidationPipe) query: FindPaginatedDiscountDto) {
      const {page, perpage} = query;
      const service = new GetPaginatedDiscountService(this.discountRepository);
      return (await service.execute({page, perpage})).Value.discounts;
    }
}