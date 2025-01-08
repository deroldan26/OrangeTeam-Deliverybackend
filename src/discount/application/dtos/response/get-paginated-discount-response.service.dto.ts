import { GetDiscountByIdServiceResponseDto } from "./get-discount-response.service.dto";

export interface GetPaginatedDiscountServiceResponseDto{
    discounts: GetDiscountByIdServiceResponseDto[];
}