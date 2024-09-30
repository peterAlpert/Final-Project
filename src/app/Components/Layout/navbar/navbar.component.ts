import { SharedService } from './../../../Core/Services/shared.service';

import { WhishlistService } from './../../../Core/Services/whishlist.service';
import { CartService } from './../../../Core/Services/cart.service';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Core/Services/auth.service';
import Swal from 'sweetalert2';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styles: ''
})
export class NavbarComponent implements OnInit {
  userId: number = 0;
  wishListCount: any
  cartCount: any
  orderCount: number = 0

  IsLogged: boolean = false
  token: string | null


  constructor(
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WhishlistService: WhishlistService,
    private _SharedService: SharedService
  ) {
    this.userId = Number(localStorage.getItem('userId'))
    this.token = localStorage.getItem("token");

    this._AuthService.isLogin.subscribe({ next: res => this.IsLogged = res })
  }

  ngOnInit(): void {
    this._CartService.getcartByUserId(this.userId).subscribe({
      next: res => {
        this.cartCount = res.cartItems.length;
        this._SharedService.updateCartCount(this.cartCount);
      },
      error: err => {
        this.cartCount = 0;
        this._SharedService.updateCartCount(this.cartCount);
      }
    });

    this._WhishlistService.getAll(this.userId).subscribe({
      next: res => {
        this.wishListCount = res.length;
        this._SharedService.updateWishlistCount(this.wishListCount);
      },
      error: err => {
        this.wishListCount = 0;
        this._SharedService.updateWishlistCount(this.wishListCount);
      }
    });


    this._SharedService.wishListCount.subscribe(res => this.wishListCount = res)
    this._SharedService.cartCount.subscribe(res => this.cartCount = res)
    // this.wishListCount = this._SharedService.getwishlistCount();
    // this.cartCount = this._SharedService.getCartCount();
    // this._WhishlistService.wishListCount.subscribe(res => this.wishListCount = res)
    // this._CartService.cartCount.subscribe(res => this.cartCount = res)
    // this._WhishlistService.getAll(this.userId).subscribe({ next: res => this.wishListCount = res.length })
    // this._CartService.getcartByUserId(this.userId).subscribe({ next: res => this.cartCount = res.cartItems.length })
    // this._OrderService.getByUserId(this.userId).subscribe({ next: res => this.orderCount = res.length})
  }

  //sign out
  SignOut() {
    Swal.fire({
      title: 'Sign out',
      text: 'Are You Sure',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Confirm',
      cancelButtonText: 'Cancel'
    }).then(res => {
      if (res.isConfirmed) {
        localStorage.removeItem("token");
        localStorage.removeItem("userId")
        this._AuthService.isLogin.next(false);
        this._ToastrService.success("Sign out sucessfully")
        this._Router.navigate(['/home'])
      }
    });
  }

}
