import { ICartItem } from "./icart-item"

export interface ICart {
    id: number
    userId: number,
    cartItems: ICartItem[]
}
