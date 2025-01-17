import { Type } from "class-transformer";
import { IsInt, IsOptional, Min } from "class-validator";


export class FindPaginatedDiscountDto {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    page: number = 1;

    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    perpage: number = 10;
}