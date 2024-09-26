import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private _HttpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/Orders`)
  }

  getById(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/Orders/${id}`)
  }

  getByUserId(userId: number) {
    return this._HttpClient.get(`${environment.baseUrl}/Orders/${userId}`)
  }

  delete(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/Orders/${id}`)
  }

}
