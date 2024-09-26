import { Injectable, OnInit } from '@angular/core';
import { IcategoryBrand } from '../interfaces/icategory-brand';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService implements OnInit {

  constructor(private _HttpClient: HttpClient) { }
  ngOnInit(): void {

  }

  getAll(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/category`)
  }
  getById(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/category/${id}`)
  }

  add(category: IcategoryBrand): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/category`, category)
  }

  remove(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/category/${id}`)
  }

}
