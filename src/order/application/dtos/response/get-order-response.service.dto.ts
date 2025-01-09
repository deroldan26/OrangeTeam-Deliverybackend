
export interface ProductResponseDto {
    id: string;
    quantity: number;
}

export interface ComboResponseDto {
    id: string;
    quantity: number;
}

export interface PaymentResponseDto {
    id: string;
    paymentMethod: string;
    currency: string;
    total: number;
}

export interface ReportResponseDto {
    id: string;
    description: string;
    reportDate: Date;
}

export interface GetOrderByIdServiceResponseDto {
    id: string
    createdDate: Date
    status: string
    address: string
    latitude: number
    longitude: number
    products: ProductResponseDto[]
    combos: ComboResponseDto[]
    paymentMethod: PaymentResponseDto
    report: ReportResponseDto
    receivedDate: Date
}