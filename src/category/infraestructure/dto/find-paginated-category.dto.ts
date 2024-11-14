import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";


export class FindPaginatedCategoryDto {
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
  }