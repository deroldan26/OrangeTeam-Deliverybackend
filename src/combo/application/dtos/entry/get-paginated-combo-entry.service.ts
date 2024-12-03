export interface GetPaginatedComboServiceEntryDto{
    category?: string[];
    name?: string;
    price?: number;
    discount?: string;
    page: number;
    take: number;
}