import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../Core/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../Core/interfaces/iuser';
import { CommonModule } from '@angular/common';
import { Iprofile } from '../../../../Core/interfaces/iprofile';

@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css'
})
export class ViewAllUsersComponent implements OnInit {

  users: Iprofile[] = []
  loading: boolean = true;
  error: string | null = null;


  constructor(
    private _AuthService: AuthService,
    private _ToastrService: ToastrService
  ) {

  }

  ngOnInit(): void {
    this._AuthService.getAllUsers().subscribe({
      next: res => this.users = res,
      error: err => console.log(err)
    })

  }

  block(user: Iprofile) {
    console.log(user.userId);
    this._AuthService.blockUser(user.userId).subscribe({
      next: res => this._ToastrService.success('user blocked successfully'),
      error: err => console.log(err)
    })

  }




}
