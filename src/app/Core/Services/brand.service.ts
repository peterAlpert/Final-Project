import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { IcategoryBrand } from '../interfaces/icategory-brand';

@Injectable({
  providedIn: 'root'
})
export class BrandService {

  constructor(private _HttpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/brand`)
  }
  getById(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/brand/${id}`)
  }

  add(brand: IcategoryBrand): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/brand`, brand)
  }

  remove(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/brand/${id}`)
  }
}
