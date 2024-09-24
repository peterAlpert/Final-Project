import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../Core/Services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './forget-password.component.html',
  styles: ''
})
export class ForgetPasswordComponent {
  toAddress: string = ""

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router

  ) {
  }

  sendMail() {
    console.log(this.toAddress);

    this._AuthService.forgetPassword_email(this.toAddress).subscribe({
      next: res => {
        this._ToastrService.info("please check your email for OTP")
        localStorage.setItem("email", this.toAddress)
        this._Router.navigate(["forgetPassword/otp"])
      },
      error: err => {
        this._ToastrService.warning("Your entered wrong email ")
      }
    })


  }
}
