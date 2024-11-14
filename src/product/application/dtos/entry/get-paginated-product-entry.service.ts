export interface GetPaginatedProductServiceEntryDto{
    page: number;
    take: number;
    category?: string;
    name?: string;
}