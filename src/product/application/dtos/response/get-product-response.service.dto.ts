
export interface GetProductByIdServiceResponseDto {
    id: string
    name: string
    description: string
    images: string[]
    price: number
    currency: string
    weight: number
    stock: number
    category: string
}