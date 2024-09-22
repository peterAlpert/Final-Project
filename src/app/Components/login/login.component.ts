import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styles: ''
})
export class LoginComponent {
  userId: number = 0;
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

          //set userId in localstorage
          this._AuthService.getUserId().subscribe({
            next: (res) => {
              this.userId = res;
              localStorage.setItem("userId", this.userId.toString())

            }
          })
          setTimeout(() => {
            location.reload();
          }, 200);
        },
        error: (err) => {
          this.errMsg = err.error.Username
          this._ToastrService.info(this.errMsg)
          this.isLoading = false;
        }
      })


    }

  }

}
