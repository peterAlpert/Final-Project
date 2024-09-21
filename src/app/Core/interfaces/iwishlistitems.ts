import { IFavoritelist } from "./ifavoritelist"
import { IProduct } from "./iproduct"

export interface IWishlistitems {
    id: number
    favList: IFavoritelist
    favlistId: number
    product: IProduct
    productId: number

}
