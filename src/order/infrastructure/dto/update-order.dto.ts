import { PartialType } from "@nestjs/swagger";
import { CreateOrderDto } from "./create-order.dto";
import { IsOptional, IsString, MinLength } from "class-validator";

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
    @IsString()
    @MinLength(3)
    @IsOptional()
    status: string;

    @IsString()
    @MinLength(3)
    @IsOptional()
    report: string;

    @IsString()
    @IsOptional()
    receivedDate: string;

    @IsString()
    @IsOptional()
    cancelledDate: string;

    @IsString()
    @IsOptional()
    shippedDate: string;

    @IsString()
    @IsOptional()
    beingProcessedDate: string;

    @IsString()
    @IsOptional()
    indications: string;
}