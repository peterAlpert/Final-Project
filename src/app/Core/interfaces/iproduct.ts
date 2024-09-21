export interface IProduct {
    id: number
    name: string
    description: string
    price: number
    stockQuantity: number
    categoryId: number
    brandId: number
    brand: Object
    category: object
}
