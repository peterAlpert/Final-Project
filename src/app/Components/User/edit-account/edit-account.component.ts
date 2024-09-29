import { Router } from '@angular/router';
import { AuthService } from './../../../Core/Services/auth.service';
import { SharedService } from './../../../Core/Services/shared.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../Core/Services/profile.service';
import { Iprofile } from '../../../Core/interfaces/iprofile';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-account',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './edit-account.component.html',
  styles: ''
})
export class EditAccountComponent implements OnInit {
  profileData: Iprofile = {} as Iprofile
  profileForm: FormGroup

  constructor(
    private _ProfileService: ProfileService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _SharedService: SharedService,
    private _AuthService: AuthService,
    private _Router: Router
  ) {
    this.profileForm = this._FormBuilder.group({
      userName: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      address: ['', Validators.required],
      image: ['', Validators.required]
    });

  }

  ngOnInit(): void {
    this._ProfileService.get().subscribe({
      next: res => this.profileData = res,
      error: err => console.log(err)
    })

    setTimeout(() => {
      this.profileForm.patchValue(this.profileData);
      this._SharedService.changeName(this.profileData.userName)
    }, 100);
  }


  updateData() {
    this._ProfileService.update(this.profileForm.value).subscribe({
      next: () => {
        if (this.profileForm.valid)
          this._ToastrService.success("Your Profile Data Updated Successfuly")
        else
          this._ToastrService.warning("Please fill all data")
      },
      error: err => console.log(err)
    })
  }


  deleteAccount() {
    // Swal.fire({
    //   title: 'Are You Sure?',
    //   text: 'Check Your Data before delete',
    //   icon: 'question',
    //   showCancelButton: true,
    //   confirmButtonColor: '#d33',
    //   cancelButtonColor: '#3085d6',
    //   confirmButtonText: 'Yes, Delete Account',
    //   cancelButtonText: 'Cancel'
    // }).then((result) => {
    //   if (result.isConfirmed) {
    //     this.executeDelete();
    //   }
    // });

    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Please enter your password to confirm account deletion.',
      input: 'password',
      inputPlaceholder: 'Password',
      showCancelButton: true,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      preConfirm: (password) => {
        if (!password) {
          Swal.showValidationMessage('You need to enter your password');
          return false;
        }
        const isValid = this.checkPassword(password);
        console.log('Is password valid?', isValid);
        return isValid ? true : Promise.reject('Incorrect password.');
      }
    }).then((result) => {
      console.log('Result:', result);
      if (result.isConfirmed) {
        this.executeDelete();
      }

    }).catch(error => {

      Swal.fire('Error!', error, 'error');
    });
  }

  checkPassword(password: string): boolean {
    const correctPassword = '@Peter123';
    return password === correctPassword;
  }

  executeDelete() {
    this._ProfileService.delete().subscribe({
      next: () => {
        Swal.fire('Deleted!', 'Your account has been successfully deleted.', 'success');
        localStorage.removeItem("token");
        localStorage.removeItem("userId")
        this._AuthService.isLogin.next(false);
        this._ToastrService.success("Sign out sucessfully")
        this._Router.navigate(['/home'])
      },
      error: () => {
        Swal.fire('Error!', 'connection error', 'error');
      }
    })


  }



}