export interface CreateComboServiceResponseDto {
    id: string;
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
}