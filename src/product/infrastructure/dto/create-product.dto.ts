import { IsNumber, IsString, Min, MinLength, IsArray} from 'class-validator';

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

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  @MinLength(1)
  category: string;
}
