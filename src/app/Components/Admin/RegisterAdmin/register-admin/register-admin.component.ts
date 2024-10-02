import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IUser } from '../../../../Core/interfaces/iuser';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../../Core/Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register-admin',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './register-admin.component.html',
  styles: ``
})
export class RegisterAdminComponent {

  userData: IUser = {} as IUser;
  errMsg: string = ''; //==>false ,"dfgdf"===>true
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    address: new FormControl('')

  })

  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router
  ) { }

  register(): void {
    this.isLoading = true;

    if (this.registerForm.valid) {

      this._AuthService.registerAdmin(this.registerForm.value).subscribe({
        next: () => {
          this._ToastrService.success(`Welcome  ${this.registerForm.value.userName} to our website El-Dokan As Admin `);
          this._Router.navigate(['dashboard'])
        },
        error: (err: any) => {
          console.log(err);
          this.errMsg = err.error.UserInputErrors
          this.isLoading = false;
        }
      });
    }
  }
}
