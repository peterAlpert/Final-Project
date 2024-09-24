
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';
import { environment } from '../../../environments/environment';


@Injectable({
  providedIn: 'root'

})
export class AuthService {
  userInfo: IUser = {} as IUser
  token: any
  isLogin: BehaviorSubject<boolean>

  constructor(private http: HttpClient) {
    this.token = localStorage.getItem('eToken')

    var flag = false
    if (this.token)
      flag = true

    this.isLogin = new BehaviorSubject<boolean>(flag);
  }

  register(userData: IUser): Observable<any> {
    return this.http.post(environment.baseUrl + '/Account/Register', userData)
  }

  login(userData: any): Observable<any> {
    return this.http.post(environment.baseUrl + '/Account/Login', userData)
  }

  forgetPassword_email(email: string): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Account/SendVerificationMail?toAddress=${email}`, {})
  }

  forgetPassword_otp(otpData: {}): Observable<any> {
    return this.http.post(`${environment.baseUrl}/Account/ResetPassword`, otpData)
  }


  changePassword(passData: any): Observable<any> {
    this.token = localStorage.getItem("eToken")
    return this.http.post(`${environment.baseUrl}/Account/UpdatePassword`, passData, {
      headers: new HttpHeaders({
        "authorization": `Bearer ${this.token}`
      })
    })
  }



  getUserId(): Observable<any> {
    this.token = localStorage.getItem("eToken")

    return this.http.get(`${environment.baseUrl}/Account/getCurrentUserID`, {
      headers: new HttpHeaders({
        "authorization": `Bearer ${this.token}`
      })
    })
  }

}
