import { IsNumber, IsString, Min, MinLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsString()
  @MinLength(1)
  image: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @MinLength(1)
  currency: string;

  @IsNumber()
  @Min(0)
  weight: number;
}
