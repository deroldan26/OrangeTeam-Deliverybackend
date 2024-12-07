import { Controller, Get, Post, Body, Patch, Param, Delete, Inject, ValidationPipe, Query } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { UserPostgresRepository } from '../repositories/postgres/user.repository';
import { DataSource } from 'typeorm';
import { createUserService } from '../../../user/application/commands/create-user.service';
import { getUserByIdService } from '../../../user/application/queries/get-userById.service';
import { getUserByEmailService } from '../../../user/application/queries/get-userByEmail.service';
import { MessagingService } from '../../../core/infrastructure/events/rabbitmq/messaging.service';
import { DomainEvent } from '../../../core/domain/domain.event';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../auth/infraestructure/guard/guard.service';
import { UseGuards } from '@nestjs/common';
import { UpdateUserService } from 'src/user/application/commands/update-order.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { BcryptService } from 'src/core/infrastructure/bcrypt/bcrypt.service';

@ApiTags('User')
@ApiBearerAuth('JWT-auth')
@Controller('User')
export class UserController {
  private readonly userRepository: UserPostgresRepository;
  private readonly uuidCreator: UuidGenerator;
  private readonly bcryptService: BcryptService;
  
  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this.uuidCreator = new UuidGenerator();
    this.userRepository = new UserPostgresRepository(this.dataSource);
    this.bcryptService = new BcryptService();
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    const service = new createUserService(this.userRepository, this.uuidCreator);
    return await service.execute(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async GetUserById(@Param('id') id: string) {
    const service = new getUserByIdService(this.userRepository)
    var response = await service.execute({id:id})
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Get('byEmail/:email')
  async GetUserByEmail(@Param('email') email: string) {
    const service = new getUserByEmailService(this.userRepository)
    var response = await service.execute({email:email})
    return response;
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateOrder(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const service = new UpdateUserService(this.userRepository, this.bcryptService);
    var response = await service.execute({id: id, ...updateUserDto});
    return response;
  }

}
