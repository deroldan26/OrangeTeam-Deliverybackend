export interface ProductEntryDto {
    id: string;
    quantity: number;
}

export interface ComboEntryDto {
    id: string;
    quantity: number;
}

export interface UpdateOrderServiceEntryDto{
    id: string
    status?: string
    address?: string
    products?: ProductEntryDto[];
    combos?: ComboEntryDto[];
    report?: string;
    receivedDate?: Date;
}