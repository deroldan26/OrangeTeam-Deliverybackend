import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";


export class FindPaginatedProductDto {  
  @IsOptional()
    @IsOptional()
    @IsString()
    category?: string;
    
    @IsOptional()
    @IsString()
    name?: string;
    
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    take: number = 10;
  }