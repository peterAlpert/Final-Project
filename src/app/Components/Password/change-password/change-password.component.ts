import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth.service';

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

  token = localStorage.getItem("eToken");

  constructor(private _AuthService: AuthService, private _Toastr: ToastrService) {
  }

  changePassword() {
    this.passwordData = {
      'CurrentPassword': this.CurrentPassword,
      'NewPassword': this.NewPassword
    }
    console.log(this.passwordData);
    console.log(this.token);
    console.log(localStorage.getItem("userId"));

    this._AuthService.changePassword(this.passwordData).subscribe({
      next: res => {
        this._Toastr.success("Password updated successfully.")
      },
      error: err => { console.log(err); console.log(this.token) }
    })
  }
}
