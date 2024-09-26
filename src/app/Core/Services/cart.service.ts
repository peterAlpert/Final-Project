import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  constructor(private _HttpClient: HttpClient) { }

  add(cartitemObj: {}) {
    return this._HttpClient.post(`${environment.baseUrl}/cartitem/createcartitem`, cartitemObj)
  }

  getcartByUserId(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/Cart/user/${id}`)
  }

  incQty(id: number): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/cartitem/IncreaseQuantity?cartItemId=${id}`, {})
  }

  decQty(id: number): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/cartitem/DecreaseQuantity?cartItemId=${id}`, {})
  }

  getProductsByUserId(id: number) {
    return this._HttpClient.get(`${environment.baseUrl}/cart/user/${id}/products`)
  }

  deleteItem(userId: number, productId: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/CartItem/RemoveItemFromcart?userId=${userId}&productId=${productId}`)
  }
}
