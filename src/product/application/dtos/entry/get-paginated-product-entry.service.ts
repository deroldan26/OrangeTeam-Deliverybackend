export interface GetPaginatedProductServiceEntryDto{
    page: number;
    perpage: number;
    category?: string;
    name?: string;
}