export interface GetDiscountByIdServiceResponseDto {
    id: string;
    name: string;
    description: string;
    expireDate: Date;
    initDate: Date;
    percentage: number;
}