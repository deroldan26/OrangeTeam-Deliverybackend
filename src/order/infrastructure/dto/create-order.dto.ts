import { Type } from "class-transformer";

import { IsArray, IsNumber, IsString, Min, MinLength, ValidateNested, IsOptional } from "class-validator";

class ProductDto {
    @IsString()
    id: string;

    @IsNumber()
    quantity: number;
}

class ComboDto {
    @IsString()
    id: string;

    @IsNumber()
    quantity: number;
}

export class CreateOrderDto{
    @IsString()
    @MinLength(6)
    address: string;

    @IsNumber()
    latitude: number;

    @IsNumber()
    longitude: number;

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ProductDto)
    products: ProductDto[];

    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => ComboDto)
    combos: ComboDto[];

    @IsString()
    @IsOptional()
    userId: string;

    @IsString()
    @MinLength(4)
    paymentMethod: string;

    @IsString()
    @MinLength(3)
    currency: string;

    @IsNumber()
    @Min(0)
    total: number;

    @IsString()
    @IsOptional()
    cupon_code?: string;

    @IsString()
    @IsOptional()
    indications?: string;
}