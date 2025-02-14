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
    latitude?: number
    longitude?: number
    products?: ProductEntryDto[];
    combos?: ComboEntryDto[];
    paymentMethod?: string
    currency?: string
    total?: number
    report?: string;
    receivedDate?: string;
    cancelledDate?: string;
    shippedDate?: string;
    beingProcessedDate?: string; 
    indications?: string;
}