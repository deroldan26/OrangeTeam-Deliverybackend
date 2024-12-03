export interface CreateDiscountServiceResponseDto {
    id: string;
    name: string;
    description: string;
    expireDate: Date;
    initDate: Date;
    percentage: number;
}