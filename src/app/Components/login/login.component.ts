import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.component.html',
  styles: ''
})
export class LoginComponent {
  loginForm: FormGroup = new FormGroup({
    userName: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]),
    password: new FormControl('', [Validators.required]),
  })

  constructor(private _AuthService: AuthService, private _Router: Router, private _ToastrService: ToastrService) { }

  ngOnInit(): void {

  }
  errMsg: string = ''; //==>false ,"dfgdf"===>true

  isLoading: boolean = false

  login(): void {
    const userData = this.loginForm.value;
    this.isLoading = true;

    if (this.loginForm.valid) {
      this._AuthService.login(userData).subscribe({
        next: (response) => { //data tmam
          localStorage.setItem('eToken', response.token);
          this._ToastrService.show("Login Sucessfully")
          this.isLoading = false;
          this._Router.navigate(['home'])


          setTimeout(() => {
            location.reload();
          }, 10);
        },
        error: (err) => {
          this._ToastrService.info(err.error.PAssword)
          this.isLoading = false;
        }
      })

    }

  }

}
