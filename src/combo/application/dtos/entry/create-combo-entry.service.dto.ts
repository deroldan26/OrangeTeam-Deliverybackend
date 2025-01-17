export interface CreateComboServiceEntryDto {
    name: string;
    price: number;
    currency: string;
    description: string;
    images: string[];
    products: string[];
    weight: number;
    measurement: string;
    stock: number;
    caducityDate?: Date;
    categories: string[];
    discount?: string;
}