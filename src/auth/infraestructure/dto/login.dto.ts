import { IsString, IsNumber, Min, MinLength, IsArray } from 'class-validator';

export class LoginDto {
    @IsString()
    //@MinLength(5)
    email: string;

    @IsString()
    //@Min(5)
    password: string;

}
