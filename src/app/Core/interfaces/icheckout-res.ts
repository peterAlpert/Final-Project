import { ICartItem } from "./icart-item";

export interface IcheckoutRes {
    "totalAmount": number,
    "cartItems": ICartItem[]
}
