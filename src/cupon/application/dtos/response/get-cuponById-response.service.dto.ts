export interface GetCuponByIdServiceResponseDto {
    id: string;
    name: string;
    value: number;
    description: string;
    expireDate: Date;
    startDate: Date;
}