export interface GetComboByIdServiceResponseDto {
    id: string;
    name: string;
    description: string;
    comboImages: string[];
    specialPrice: number;
    currency: string;
    weight: number;
    measurement: string;
    stock: number;
    categories: string[];
    products: string[];
    caducityDate: Date;
}