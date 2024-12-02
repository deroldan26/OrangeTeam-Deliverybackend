export interface GetPaginatedComboServiceEntryDto{
    category?: string[];
    name?: string;
    price?: number;
    page: number;
    take: number;
}