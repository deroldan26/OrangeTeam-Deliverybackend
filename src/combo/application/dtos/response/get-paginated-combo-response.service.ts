import { GetComboByIdServiceResponseDto } from "./get-combo-response.service.dto";

export interface GetPaginatedComboServiceResponseDto{
    combos: GetComboByIdServiceResponseDto[];
}