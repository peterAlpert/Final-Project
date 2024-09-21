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

  getCartById() {

  }
}
