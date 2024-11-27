export interface UpdateProductServiceEntryDto{
    id: string
    name?: string
    description?: string
    image?: string
    price?: number
    currency?: string
    weight?: number
    stock?: number
    category?: string
}