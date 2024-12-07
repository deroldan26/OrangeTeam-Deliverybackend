import { IsNumber, IsString, Min, MinLength, IsArray, IsDate, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @MinLength(6)
  name: string;

  @IsString()
  @MinLength(10)
  description: string;

  @IsArray()
  @IsString({ each: true })
  images: string[];

  @IsNumber()
  @Min(0)
  price: number;

  @IsString()
  @MinLength(1)
  currency: string;

  @IsNumber()
  @Min(0)
  weight: number;

  @IsString()
  @MinLength(1)
  measurement: string;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsOptional()
  @IsDate()
  @Transform(({ value }) => value ? new Date(value) : value)
  caducityDate?: Date;

  @IsArray()
  @IsString({ each: true })
  categories: string[];
  
  @IsString()
  @MinLength(1)
  @IsOptional()
  discount?: string;
}
