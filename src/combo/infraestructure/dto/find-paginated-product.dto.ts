import { Transform, Type } from "class-transformer";
import { IsArray, IsInt, IsNumber, IsOptional, IsString, Min } from "class-validator";


export class FindPaginatedComboDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    take: number = 10;

    @IsOptional()
    @Transform(({ value }) => (typeof value === 'string' ? [value] : value))
    @IsArray()
    @IsString({ each: true })
    category?: string[];
  
    @IsOptional()
    @IsString()
    name?: string;
  
    @IsOptional()
    @IsNumber()
    @Min(1)
    @Type(() => Number)
    price?: number;
  
    @IsOptional()
    @IsString()
    discount?: string;
  }