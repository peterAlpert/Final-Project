import { Component } from '@angular/core';
import { IUser } from '../../../../Core/interfaces/iuser';

@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css'
})
export class ViewAllUsersComponent {

  users: IUser[] = []

  

}
