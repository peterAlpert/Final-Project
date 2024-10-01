import { AuthService } from './../../../../Core/Services/auth.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../../../../Core/interfaces/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css'
})
export class ViewAllUsersComponent implements OnInit {


  users: IUser[] = []
  loading: boolean = true;
  error: string | null = null;


  constructor(private _AuthService: AuthService) {

  }

  ngOnInit(): void {
    this._AuthService.getAllUsers().subscribe({
      next: res => console.log(res),
      error: err => console.log(err)
    })

  }




}
