export interface CreateProductServiceResponseDto {
    id: string
    name: string
    description: string
    images: string[]
    price: number
    currency: string
    weight: number
    measurement: string
    stock: number
    categories: string[]
    caducityDate?: Date
    discount?: string
}