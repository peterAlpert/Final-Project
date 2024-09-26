import { SharedService } from './../../../Core/Services/shared.service';
import { ProfileService } from './../../../Core/Services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { EditAccountComponent } from '../edit-account/edit-account.component';
import { ChangePasswordComponent } from '../../Password/change-password/change-password.component';
import { Iprofile } from '../../../Core/interfaces/iprofile';
import { IProduct } from '../../../Core/interfaces/iproduct';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RouterLink, RouterOutlet, EditAccountComponent, ChangePasswordComponent],
  templateUrl: './profile.component.html',
  styles: ''
})
export class ProfileComponent implements OnInit {
  username: string = "username"
  role: string = "his role : appears if exists"

  constructor(private _SharedService: SharedService) {

  }
  ngOnInit(): void {
    this._SharedService.currentName.subscribe(res => this.username = res)
  }


}
