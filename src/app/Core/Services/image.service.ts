import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  constructor(
    private _HttpClient: HttpClient
  ) { }

  addImage(picDTO: any): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/ImageTest/addPic`, picDTO, {
      headers: { 'Content-Type': 'application/json' }
    })
  }

  getImage(userId: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/ImageTest/getImg?userId=${userId}`)
  }

}
