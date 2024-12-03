import { Controller, Post, Get, Param, Body, Inject, Query, ValidationPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { DataSource } from 'typeorm';
import { UseGuards } from '@nestjs/common';
import { JwtService } from '../jwt/jwt.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { LoginDto } from '../dto/login.dto';
import { getUserByEmailService } from '../../../user/application/queries/get-userByEmail.service';
import { UserPostgresRepository } from '../../../user/infrastructure/repositories/postgres/user.repository';
import { BcryptService } from "../../../core/infrastructure/bcrypt/bcrypt.service";
import { CreateUserDto } from '../../../user/infrastructure/dto/create-user.dto';
import { createUserService } from '../../../user/application/commands/create-user.service';
import { UuidGenerator } from '../../../core/infrastructure/id.generator.ts/uuid-generator';
import { LoginResponseDto } from 'src/auth/application/dtos/response/login.response.dto';
import { response } from 'express';

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
  private readonly userRepository: UserPostgresRepository;
  private readonly _jwtService: JwtService;
  private readonly _bcryptService: BcryptService;
  private readonly uuidCreator: UuidGenerator;

  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this._jwtService = new JwtService();
    this._bcryptService = new BcryptService();
    this.userRepository = new UserPostgresRepository(this.dataSource);
    this.uuidCreator = new UuidGenerator();
  }

  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const service = new createUserService(this.userRepository, this.uuidCreator);
    return await service.execute(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    var service = new getUserByEmailService(this.userRepository);
    var user_log = await service.execute({ email: loginDto.email });

    if (user_log == null || !user_log.isSuccess()) {
      return { message: 'The email is not registered' };
    }

    if (await this._bcryptService.compare(loginDto.password, user_log.Value.password)) {
      const payload = { email: loginDto.email};
      const token = this._jwtService.generateToken(payload);
      const response: LoginResponseDto = {
        user: {
          id: user_log.Value.id,
          name: user_log.Value.name,
          email: user_log.Value.email,
          password: user_log.Value.password,
          phone: user_log.Value.phone,
          type: user_log.Value.type
        },
        token: token
      } 
      return { response };
    }
    return { message: 'Wrong Password' };
  }

}
