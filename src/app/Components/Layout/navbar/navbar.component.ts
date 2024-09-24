import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Core/Services/auth.service';
import { WhishlistService } from '../../../Core/Services/whishlist.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { SharedService } from '../../../Core/Services/shared.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './navbar.component.html',
  styles: ''
})
export class NavbarComponent implements OnInit {
  userId: number = 0;
  IsLogged: boolean = false

  token: string | null
  wishListCount: number = 0
  cartCount: number = 0

  constructor(
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _AuthService: AuthService,
    private _SharedService: SharedService
  ) {
    this.userId = Number(localStorage.getItem('userId'))
    this.token = localStorage.getItem("eToken");

    this._AuthService.isLogin.subscribe({ next: res => this.IsLogged = res })


  }

  ngOnInit(): void {
    this._SharedService.wishListCount.subscribe(res => this.wishListCount = res)
    this._SharedService.cartCount.subscribe(res => this.cartCount = res)
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
        localStorage.removeItem("eToken");
        localStorage.removeItem("userId")
        this._AuthService.isLogin.next(false);
        this._ToastrService.success("Sign out sucessfully")
        this._Router.navigate(['/home'])
      }
    });
  }

}
