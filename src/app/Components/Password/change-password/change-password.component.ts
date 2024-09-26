import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth.service';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './change-password.component.html',
  styles: ''
})
export class ChangePasswordComponent {
  passwordData: {} = {}
  CurrentPassword: string = ""
  NewPassword: string = ""

  token = localStorage.getItem("token");

  constructor(private _AuthService: AuthService, private _Toastr: ToastrService) {
  }

  changePassword() {
    this.passwordData = {
      'CurrentPassword': this.CurrentPassword,
      'NewPassword': this.NewPassword
    }

    this._AuthService.changePassword(this.passwordData).subscribe({
      next: res => {
        this._Toastr.success("Password updated successfully.")
      },
      error: err => this._Toastr.warning("password incorrect")
    })
  }
}
