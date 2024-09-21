import { IProduct } from './../interfaces/iproduct';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  products: IProduct[] = [] as IProduct[]

  constructor(private _HttpClient: HttpClient) { }

  GetAll(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/product`);
  }

  GetByID(Id: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/product/${Id}`)
  }

  Add(prod: IProduct) {
    this._HttpClient.post(`${environment.baseUrl}/product`, prod)
  }

  // update(Id:number){
  //   this._HttpClient.post(`${environment.baseUrl}/product/${Id}`)
  // }

  delete(Id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/product/${Id}`)
  }

  search(str: string): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/product/search/${str}`)
  }

}
