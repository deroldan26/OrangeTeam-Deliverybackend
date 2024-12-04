export interface ProductEntryDto {
    id: string;
    quantity: number;
}

export interface ComboEntryDto {
    id: string;
    quantity: number;
}

export interface CreateOrderServiceEntryDto{
    address: string
    products: ProductEntryDto[];
    combos: ComboEntryDto[];
    paymentMethod: string
    currency: string
    total: number
}