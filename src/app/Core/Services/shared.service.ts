import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CartService } from './cart.service';
import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { WhishlistService } from './whishlist.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { IProduct } from '../interfaces/iproduct';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {
  WLCount: number = 0
  CaCount: number = 0
  userId: number = 0;

  constructor(
    private _CartService: CartService,
    private _WhishlistService: WhishlistService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) {
    this.userId = Number(localStorage.getItem('userId'))

    this._WhishlistService.getAll(this.userId).subscribe({ next: res => this.WLCount = res.length })
    this._CartService.getcartByUserId(this.userId).subscribe({ next: res => this.CaCount = res.cartItems.length })
  }

  ngOnInit(): void {


  }


  private wishlistData = new BehaviorSubject<number>(this.WLCount);
  wishListCount = this.wishlistData.asObservable();
  updateWishlistCount(count: number) {
    this.wishlistData.next(count);
  }
  getCartCount(): Observable<number> {
    return this.wishListCount;
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


  private username = new BehaviorSubject<string>('');
  currentName = this.username.asObservable();

  changeName(data: string) {
    this.username.next(data);
  }


  //shared function on product
  addToCart(prod: IProduct) {
    const cartItem = {
      'price': prod.price,
      'userId': this.userId,
      'productId': prod.id,
      'quantity': 1
    }

    if (!this.IsLogeed()) {
      this._ToastrService.warning("Please login first")
      this._Router.navigate(['/Login'])
    }
    else {
      this._CartService.add(cartItem).subscribe({
        next: res => {
          if (res) {
            this._ToastrService.success(`${prod.name} : added to you cart successfully`)

          }
          else {
            this._ToastrService.warning(`${prod.name} : Already exists in you cart`)
            // var count = 0
            // this._SharedService.cartProdQty.subscribe(res => count = res)
            // console.log(count);

            // this._SharedService.updateCartProdQty(count = count + 1)
            // console.log(count);

          }
        },
        error: err => console.log(err)
      })

    }

  }

  addToWhishlist(prod: IProduct) {
    const whishlistData = {
      "userId": this.userId,
      "productId": prod.id
    }

    if (!this.IsLogeed()) {
      this._ToastrService.warning("Please login first")
      this._Router.navigate(['/Login'])
    } else {
      this._WhishlistService.add(whishlistData).subscribe({
        next: (res: any) => {
          this.toggleWishlist(prod.id)
          this._ToastrService.success(`${prod.name} : added to wishlist`);
        },
        error: () => this._ToastrService.warning("Product is Already Exists in Your Wishlist")
      })
    }
  }

  IsLogeed(): boolean {
    var token = localStorage.getItem('token')!

    if (token)
      return true
    else
      return false

  }

  //to color hreart to red when clicked
  wishlistIds: number[] = [];
  toggleWishlist(productId: number) {
    const index = this.wishlistIds.indexOf(productId);
    if (index === -1) {
      this.wishlistIds.push(productId);
    } else {
      this.wishlistIds.splice(index, 1);
    }
  }
  isInWishlist(productId: number): boolean {
    return this.wishlistIds.includes(productId);
  }

}
