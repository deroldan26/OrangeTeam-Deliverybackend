import { IsString, IsNumber, Min, MinLength, IsArray } from 'class-validator';

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

    @IsString()
    @MinLength(1)
    comboImage: string;

    @IsArray()
    @IsString({ each: true })
    products: string[];
}
