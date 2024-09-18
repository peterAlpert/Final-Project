import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';
import { IUser } from '../interfaces/iuser';


@Injectable({
  providedIn: 'root'

})
export class AuthService {
  userInfo: any

  constructor(private http: HttpClient) {

    // this.userInfo={} as IUser;
  }

  //baseUrl

  baseUrl: string = `http://localhost:5136/api/Account/`;


  register(userData: any): any {
    return this.http.post(this.baseUrl + 'Register', userData)
  }

  login(userData: any): Observable<any> {
    return this.http.post(this.baseUrl + 'Login', userData)
  }


  // decodeUser():void{

  //   const encode = localStorage.getItem('eToken');

  //   if(encode !== null){//user tmam

  //     const decode = jwtDecode(encode);
  //     this.userInfo = decode ;
  //     console.log(decode);

  //   }

  // }




}
