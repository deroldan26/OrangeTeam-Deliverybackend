export interface CreateCuponServiceEntryDto {
    name: string;
    value: number;
    description: string;
    expireDate: Date;
    startDate: Date;
}