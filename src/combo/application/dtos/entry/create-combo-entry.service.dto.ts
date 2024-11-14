export interface CreateComboServiceEntryDto {
    name: string;
    specialPrice: number;
    currency: string;
    description: string;
    comboImage: string;
    products: string[]; 
}