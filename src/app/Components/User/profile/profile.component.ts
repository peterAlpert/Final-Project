import { SharedService } from './../../../Core/Services/shared.service';
import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { ChangePasswordComponent } from '../../Password/change-password/change-password.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet, EditAccountComponent, ChangePasswordComponent],
  templateUrl: './profile.component.html',
  styles: ''
})
export class ProfileComponent implements OnInit {
  username: string = "username"

  constructor(private _SharedService: SharedService) {

  }
  ngOnInit(): void {
    this._SharedService.currentName.subscribe(res => this.username = res)
  }


}
