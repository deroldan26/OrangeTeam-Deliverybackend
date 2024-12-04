export interface CreateComboServiceEntryDto {
    name: string;
    specialPrice: number;
    currency: string;
    description: string;
    comboImages: string[];
    products: string[];
    weight: number;
    measurement: string;
    stock: number;
    caducityDate?: Date;
    categories: string[];
    discount?: string;
}