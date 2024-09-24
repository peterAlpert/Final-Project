import { CommonModule } from '@angular/common';
import { Component, SimpleChanges } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../../Core/interfaces/iuser';

@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginComponent],
  providers: [AuthService],
  templateUrl: './registeration.component.html',
  styles: ''
})
export class RegisterationComponent {
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

  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  // confirmPassword(group: FormGroup): void {
  //   const password = group.get('password');
  //   const rePassword = group.get('rePassword');

  //   if (rePassword?.value == "") {
  //     rePassword.setErrors({ require: true });
  //   }

  //   else if (password?.value != rePassword?.value) {
  //     rePassword?.setErrors({ mismatch: true });
  //   }

  // }

  register(): void {
    this.isLoading = true;

    //console.log(this.userData);

    if (this.registerForm.valid) {

      this._AuthService.register(this.registerForm.value).subscribe({
        next: () => {
          this._ToastrService.success(`Welcome  ${this.registerForm.value.userName}  to our website El-Dokan`);
          this.registerForm.reset();
          this._Router.navigateByUrl('Login');
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
