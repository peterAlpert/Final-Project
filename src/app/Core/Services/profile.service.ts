import { Iprofile } from './../interfaces/iprofile';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  token: any

  constructor(private _HttpClient: HttpClient) { }

  get(): Observable<any> {
    this.token = localStorage.getItem("token")

    return this._HttpClient.get(`${environment.baseUrl}/appuser/viewprofile`, {
      headers: new HttpHeaders({ "authorization": `Bearer ${this.token}` })
    })
  }

  update(profileData: Iprofile): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/appuser/editprofile`, profileData, {
      headers: new HttpHeaders({ "authorization": `Bearer ${this.token}` })
    })
  }

  delete(): Observable<any> {
    this.token = localStorage.getItem("token")

    return this._HttpClient.delete(`${environment.baseUrl}/appuser/deleteprofile`, {
      headers: new HttpHeaders({ "authorization": `Bearer ${this.token}` })
    })

  }

}
