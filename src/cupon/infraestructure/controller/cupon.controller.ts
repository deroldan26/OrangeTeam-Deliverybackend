import { Body, Controller, Get, Inject, Param, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { CuponPostgresRepository } from "../repositories/cupon.repository";
import { UuidGenerator } from "src/core/infrastructure/id.generator.ts/uuid-generator";
import { DataSource } from "typeorm";
import { CreateCuponDto } from "../dto/create-cupon.dto";
import { createCuponService } from "src/cupon/application/commands/create-cupon.service";
import { getCuponByIdService } from "src/cupon/application/queries/get-cuponById.service";
import { ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/infraestructure/guard/guard.service";
import { UseGuards } from "@nestjs/common";
import { getCuponByNameService } from "src/cupon/application/queries/get-cuponByName.service";


@ApiTags('Cupon')
@ApiBearerAuth('JWT-auth')
@Controller('cupon')
export class CuponController {
  private readonly cuponRepository: CuponPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.cuponRepository = new CuponPostgresRepository(this.dataSource);
  }
  
  @UseGuards(JwtAuthGuard)
  @Post('create')
  async createCupon(@Body() createCuponDto: CreateCuponDto) {
    const service = new createCuponService(this.cuponRepository, this.uuidCreator);
    return (await service.execute(createCuponDto)).Value;
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/:id')
  async findOneCuponById(@Param('id') id: string) {
    const service = new getCuponByIdService(this.cuponRepository)
    var response = await service.execute({id:id})
    return response.Value;
  }

  @UseGuards(JwtAuthGuard)
  @Get('one/by/:name')
  async findOneCuponByName(@Param('name') name: string) {
    const service = new getCuponByNameService(this.cuponRepository)
    var response = await service.execute({name:name})
    return response.Value;
  }
}