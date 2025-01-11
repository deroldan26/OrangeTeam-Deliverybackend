export interface ProductEntryDto {
    id: string;
    quantity: number;
}

export interface ComboEntryDto {
    id: string;
    quantity: number;
}

export interface CreateOrderServiceEntryDto{
    address: string;
    latitude: number;
    longitude: number;
    products: ProductEntryDto[];
    combos: ComboEntryDto[];
    paymentMethod: string;
    currency: string;
    total: number;
    userId: string;
    cupon?: string;
}