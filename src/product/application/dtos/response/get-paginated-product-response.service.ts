import { GetProductByIdServiceResponseDto } from "./get-product-response.service.dto";

export interface GetPaginatedProductServiceResponseDto{
    products: GetProductByIdServiceResponseDto[];
}