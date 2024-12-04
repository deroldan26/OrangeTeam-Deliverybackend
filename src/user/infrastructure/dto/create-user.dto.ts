import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateUserDto {

  @IsString()
  @MinLength(6)
  email: string;

  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsString()
  @MinLength(6)
  phone: string;

  @IsString()
  @MinLength(6)
  type: string;

}
