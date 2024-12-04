import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString, Min } from "class-validator";


export class FindPaginatedOrderDto {  
  @IsOptional()
    @IsOptional()
    @IsString()
    status?: string;
    
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