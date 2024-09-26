import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CheckoutService {

  constructor(private _HttpClient: HttpClient) { }

  proceedToCheckout(checkout: {}): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/Orders/ProceedToCheckout`, checkout)
  }

  placeOrder(order: {}): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/Orders/PlaceOrder`, order)
  }
}
