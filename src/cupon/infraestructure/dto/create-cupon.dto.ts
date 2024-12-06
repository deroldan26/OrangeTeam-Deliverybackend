import { Transform } from 'class-transformer';
import { IsString, IsNumber, Min, MinLength, IsArray, IsDate, IsOptional } from 'class-validator';

export class CreateCuponDto {
    @IsString()
    @MinLength(6)
    name: string;

    @IsNumber()
    @Min(0)
    value: number;

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
    startDate: Date;
}
