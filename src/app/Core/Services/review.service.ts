import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { Ireview } from '../interfaces/ireview';

@Injectable({
  providedIn: 'root'
})
export class ReviewService {

  constructor(private _HttpClient: HttpClient) { }

  getAll(): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/review`)
  }
  getById(id: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/review/${id}`)
  }

  add(review: Ireview): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/review`, review)
  }

  remove(id: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/review/${id}`)
  }
}
