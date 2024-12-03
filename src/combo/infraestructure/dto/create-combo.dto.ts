import { Transform } from 'class-transformer';
import { IsString, IsNumber, Min, MinLength, IsArray, IsDate, IsOptional } from 'class-validator';

export class CreateComboDto {
    @IsString()
    @MinLength(6)
    name: string;

    @IsNumber()
    @Min(0)
    specialPrice: number;

    @IsString()
    @MinLength(1)
    currency: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsArray()
    @IsString({ each: true })
    comboImages: string[];

    @IsArray()
    @IsString({ each: true })
    products: string[];

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
