export interface CreateCuponServiceResponseDto {
    id: string;
    name: string;
    value: number;
    description: string;
    expireDate: Date;
    startDate: Date;
}