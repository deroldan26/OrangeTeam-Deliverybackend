import { GetCategoryByIdServiceResponseDto } from "./get-category-response.service.dto";

export interface GetPaginatedCategoryServiceResponseDto{
    categories: GetCategoryByIdServiceResponseDto[];
}