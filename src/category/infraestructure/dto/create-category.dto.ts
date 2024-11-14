import { IsString,  MinLength} from 'class-validator';

export class CreateCategoryDto {
    @IsString()
    @MinLength(6)
    name: string;

    @IsString()
    @MinLength(1)
    image: string;
}
