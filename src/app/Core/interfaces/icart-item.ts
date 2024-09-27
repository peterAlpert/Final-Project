import { IProduct } from "./iproduct";

export interface ICartItem {
    "id": number
    "price": number
    "userId": number
    "quantity": number
    "productId": number
    "product": IProduct
}

