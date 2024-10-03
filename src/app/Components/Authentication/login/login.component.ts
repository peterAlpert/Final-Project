import { CartService } from './../../../Core/Services/cart.service';
import { WhishlistService } from './../../../Core/Services/whishlist.service';
import { SharedService } from './../../../Core/Services/shared.service';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormControlOptions,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styles: '',
})
export class LoginComponent {
  cartCount: any;
  wishlistCount: any;

  userId: number = 0;
  loginForm: FormGroup = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private _AuthService: AuthService,
    private _Router: Router,
    private _ToastrService: ToastrService,
    private _SharedService: SharedService,
    private _WhishlistService: WhishlistService,
    private _CartService: CartService
  ) {}

  ngOnInit(): void {}
  errMsg: string = ''; //==>false ,"dfgdf"===>true

  isLoading: boolean = false;

  onSubmit() {
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;
      this.isLoading = true;

      this._AuthService.login(userData).subscribe({
        next: (response) => {
          this._SharedService.wishListCount.subscribe(
            (res) => (this.wishlistCount = res)
          );
          this._SharedService.cartCount.subscribe(
            (res) => (this.cartCount = res)
          );

          localStorage.setItem('token', response.token);

          this.isLoading = false;
          Swal.fire({
            icon: 'success',
            title: 'Login Sucessfully',
            text: `Welcome ${userData.username}`,
          });
          this.loginForm.reset();

          this._AuthService.isLogin.next(true);

          //set userId in localstorage
          this._AuthService.getUserId().subscribe({
            next: (res) => {
              this.userId = res;
              localStorage.setItem('userId', this.userId.toString());
            },
          });

          if (response.roles[0] == 'admin') {
            this._Router.navigate(['dashboard']);
            localStorage.setItem('isAdmin', 'true');
          } else if (response.roles[0] == null) {
            this._Router.navigate(['home']);
          }
        },
        error: (err) => {
          this.isLoading = false;

          Swal.fire({
            icon: 'error',
            title: 'Wrong!',
            text: `${JSON.stringify(err.error.Username)}`,
          });
        },
      });
    }
  }
}
