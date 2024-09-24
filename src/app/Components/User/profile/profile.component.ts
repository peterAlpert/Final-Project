import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { ChangePasswordComponent } from '../../Password/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet, EditAccountComponent, ChangePasswordComponent],
  templateUrl: './profile.component.html',
  styles: ''
})
export class ProfileComponent {
  username: string = "username"
  role: string = "his role : appears if exists"

}
