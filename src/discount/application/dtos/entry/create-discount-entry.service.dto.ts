export interface CreateDiscountServiceEntryDto {
    name: string;
    description: string;
    expireDate: Date;
    initDate: Date;
    percentage: number;
}