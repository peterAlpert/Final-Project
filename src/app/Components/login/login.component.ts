import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor( private _AuthService:AuthService, private _Router:Router){}

  ngOnInit(): void {

  }
  errMsg:string=''; //==>false ,"dfgdf"===>true

  isLoading:boolean=false




  loginForm:FormGroup = new FormGroup({
    userName:new FormControl('',[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
    password:new FormControl('',[Validators.required]),
    }, {validators:[this.confirmPassword]} as FormControlOptions)

    confirmPassword(group:FormGroup):void{
      const password=group.get('password');
      const rePassword= group.get('rePassword');

      if(rePassword?.value == "") {
        rePassword.setErrors({require:true});
      }

      else if(password?.value != rePassword?.value)
      {
        rePassword?.setErrors({mismatch: true});
      }

    }

    handleForm():void{
      const userData = this.loginForm.value;
      console.log("UserData",userData);

      this.isLoading = true;

      if(this.loginForm.valid=== true){
        this._AuthService.login(userData).subscribe({
          next:(response:any)=>{ //data tmam
            console.log(response);


            localStorage.setItem('eToken',response.token);

            //this._AuthService.decodeUser();



            this.isLoading = false;
            this._Router.navigate(['home'])


          },
          error:(err:any)=>{
            console.log(err);
            this.errMsg = err.error.PAssword
            this.isLoading = false;


          }
        })

      }

    }

}
