
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
  wishListCount: number = 0
  cartCount: number = 0
  orderCount: number = 0

  IsLogged: boolean = false
  token: string | null


  constructor(
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _CartService: CartService,
    private _WhishlistService: WhishlistService,
  ) {
    this.userId = Number(localStorage.getItem('userId'))
    this.token = localStorage.getItem("token");

    this._AuthService.isLogin.subscribe({ next: res => this.IsLogged = res })
  }

  ngOnInit(): void {
    this._WhishlistService.getAll(this.userId).subscribe({ next: res => this.wishListCount = res.length })
    this._CartService.getcartByUserId(this.userId).subscribe({ next: res => this.cartCount = res.cartItems.length })
    // this._OrderService.getByUserId(this.userId).subscribe({ next: res => this.orderCount = res.length})
  }

  //sign out
  SignOut() {
    Swal.fire({
      title: 'Sign out',
      text: 'Are You Sure',
      icon: 'success',
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
