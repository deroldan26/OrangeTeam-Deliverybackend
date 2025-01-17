export interface GetCuponByNameServiceResponseDto {
    id: string;
    code: string;
    amount: number;
    description: string;
    expiration_date: Date;
    startDate: Date;
}