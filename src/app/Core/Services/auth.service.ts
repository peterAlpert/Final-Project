
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'

})
export class AuthService {
  userInfo: IUser = {} as IUser
  token: string | number = ""

  constructor(private http: HttpClient) { }

  register(userData: IUser): Observable<any> {
    return this.http.post(environment.baseUrl + '/Account/Register', userData)
  }

  login(userData: any): Observable<any> {
    return this.http.post(environment.baseUrl + '/Account/Login', userData)
  }

  getUserId(): Observable<any> {
    this.token = localStorage.getItem("eToken")!
    //console.log(this.token);

    return this.http.get(`${environment.baseUrl}/Account/getCurrentUserID`, {
      headers: new HttpHeaders({
        "authorization": `Bearer ${this.token}`
      })
    })
  }

}
