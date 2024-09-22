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

  getItemById(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/cartitem/create cartitem/${id}`)
  }

  getCartByUserId(id: number) {
    return this._HttpClient.get(`${environment.baseUrl}/cart/user/${id}/products`)
  }

  deleteItem(userId: number, productId: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/CartItem/RemoveItemFromcart?userId=${userId}&productId=${productId}`)
  }
}
