import { IsString, IsNumber, Min, MinLength, IsArray } from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(6)
    name: string;

    @IsString()
    @MinLength(1)
    image: string;
}
