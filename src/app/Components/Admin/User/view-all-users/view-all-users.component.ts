import { Component } from '@angular/core';
import { IUser } from '../../../../Core/interfaces/iuser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css'
})
export class ViewAllUsersComponent {

  users: IUser[] = []
  loading: boolean = true;
  error: string | null = null;




}
