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


}
