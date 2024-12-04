import { Transform } from 'class-transformer';
import { IsString, IsNumber, Min, MinLength, IsArray, IsDate, IsOptional } from 'class-validator';

export class CreateDiscountDto {
    @IsString()
    @MinLength(6)
    name: string;

    @IsString()
    @MinLength(10)
    description: string;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => value ? new Date(value) : value)
    expireDate: Date;

    @IsOptional()
    @IsDate()
    @Transform(({ value }) => value ? new Date(value) : value)
    initDate: Date;

    @IsNumber()
    @Min(0)
    percentage: number;
}
