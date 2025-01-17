import { PartialType } from "@nestjs/swagger";
import { CreateUserDto } from "./create-user.dto";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateUserDto {
    @IsString()
    @MinLength(3)
    @IsOptional()
    name: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    phone: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsString()
    @IsOptional()
    image: string;

}