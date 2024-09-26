import { Iorderitem } from "./iorderitem";

export interface Iorder {
    orderId: number,
    totalAmount: number,
    orderDate: Date,
    status: number,
    clientName: string,
    items: Iorderitem[]

}
