import { JsonPipe } from '@angular/common';
import { AuthService } from '../../../Core/Services/auth.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-otp',
  standalone: true,
  imports: [FormsModule, JsonPipe],
  templateUrl: './otp.component.html',
  styles: ``
})
export class OtpComponent {
  OneTP: number = 0
  newPassword: string = ''
  otpData: {} = {}

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {
  }

  sentOTP() {
    this.otpData = {
      "otp": this.OneTP,
      "email": localStorage.getItem("email"),
      "newPassword": this.newPassword
    }

    this._AuthService.forgetPassword_otp(this.otpData).subscribe({
      next: () => {
        this._ToastrService.success("Your Password Changed Sucessfully"),
          localStorage.removeItem("email")
      },
      error: err => this._ToastrService.warning("Otp expired")
    })

  }
}
