import { IFavlistuserproduct } from './../interfaces/ifavlistuserproduct';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WhishlistService {


  constructor(private _HttpClient: HttpClient) {

  }

  getAll(userId: number): Observable<any> {
    return this._HttpClient.get(`${environment.baseUrl}/FavListItems/GetAllItemsInFavList?userId=${userId}`)
  }

  add(whishlistData: IFavlistuserproduct): Observable<any> {
    return this._HttpClient.post(`${environment.baseUrl}/FavListItems/AddProductToFavList`, whishlistData)
  }

  delete(userId: number, productId: number): Observable<any> {
    return this._HttpClient.delete(`${environment.baseUrl}/FavListItems/RemoveProductFromFavList?userId=${userId}&productId=${productId}`)
  }
}
