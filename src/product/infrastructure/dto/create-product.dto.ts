import { IsString, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(6)
  name: string;

//   @IsString()
//   @MinLength(20)
//   description: string;
}
