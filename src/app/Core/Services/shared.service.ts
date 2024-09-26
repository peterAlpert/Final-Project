import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { WhishlistService } from './whishlist.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private wishlistData = new BehaviorSubject<number>(0);
  wishListCount = this.wishlistData.asObservable();
  updateWishlistCount(count: number) {
    this.wishlistData.next(count);
  }


  private cartData = new BehaviorSubject<number>(0);
  cartCount = this.cartData.asObservable();
  updateCartCount(count: number) {
    this.cartData.next(count);
  }


  private cartDataProdQty = new BehaviorSubject<number>(1);
  cartProdQty = this.cartDataProdQty.asObservable();
  updateCartProdQty(count: number) {
    this.cartDataProdQty.next(count);
  }


  private username = new BehaviorSubject<string>(''); // استبدل `string` بنوع البيانات التي تريد تمريرها
  currentName = this.username.asObservable();

  changeName(data: string) {
    this.username.next(data);
  }


}
