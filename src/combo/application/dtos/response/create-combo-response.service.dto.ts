export interface CreateComboServiceResponseDto {
    id: string;
    name: string;
    specialPrice: number;
    currency: string;
    description: string;
    comboImage: string;
    products: string[]; 
}