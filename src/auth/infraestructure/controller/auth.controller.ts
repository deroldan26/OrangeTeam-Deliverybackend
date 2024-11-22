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

@ApiTags('Auth')
@ApiBearerAuth('JWT-auth')
@Controller('auth')
export class AuthController {
  private readonly userRepository: UserPostgresRepository;
  private readonly _jwtService: JwtService;
  private readonly _bcryptService: BcryptService;

  constructor(@Inject('DataSource') private readonly dataSource: DataSource) {
    this._jwtService = new JwtService();
    this._bcryptService = new BcryptService();
    this.userRepository = new UserPostgresRepository(this.dataSource);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    var service = new getUserByEmailService(this.userRepository);
    var user = await service.execute({ email: loginDto.email });

    if (user == null || !user.isSuccess()) {
      return { message: 'The email is not registered' };
    }

    if (await this._bcryptService.compare(loginDto.password, user.Value.password)) {
      const payload = { email: loginDto.email};
      const token = this._jwtService.generateToken(payload);
      return { token };
    }
    return { message: 'Wrong Password' };
  }

}
