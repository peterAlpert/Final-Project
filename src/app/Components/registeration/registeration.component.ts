
import { CommonModule } from '@angular/common';
import { Component, OnChanges, SimpleChanges } from '@angular/core';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { ToastrService } from 'ngx-toastr';
import { IUser } from '../../Core/interfaces/iuser';

@Component({
  selector: 'app-registeration',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LoginComponent],
  providers: [AuthService],
  templateUrl: './registeration.component.html',
  styles: ''
})
export class RegisterationComponent implements OnChanges {
  userData: IUser = {} as IUser;
  errMsg: string = ''; //==>false ,"dfgdf"===>true
  isLoading: boolean = false;

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
    // rePassword: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),
    address: new FormControl(''),
    profileImageURL: new FormControl(''),

  })//, { validators: [this.confirmPassword] } as FormControlOptions)

  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) {
    // this.userData = this.registerForm.value;
  }
  ngOnChanges(changes: SimpleChanges): void {
    // this.userData = this.registerForm.value;
  }
  //@Output() myEvent=new EventEmitter();

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

  handleForm(): void {
    this.userData = this.registerForm.value;
    this.isLoading = true;
    console.log(this.userData);


    if (this.registerForm.valid) {

      this._AuthService.register(this.userData).subscribe({
        next: () => {
          this._ToastrService.success(`Welcome to our website ElDokan`);
          this._Router.navigateByUrl('Login');
        },
        error: (err: any) => {
          this.errMsg = err.error.PAssword
          this.isLoading = false;
        }
      });
    }
  }

}
