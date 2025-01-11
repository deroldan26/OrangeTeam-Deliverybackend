export interface GetCuponByNameServiceResponseDto {
    id: string;
    name: string;
    value: number;
    description: string;
    expireDate: Date;
    startDate: Date;
}