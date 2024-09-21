import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styles: ''
})
export class NavbarComponent {
  isLogin: boolean = false;
  token: string | null
  constructor(private _Router: Router, private _ToastrService: ToastrService) {
    this.token = localStorage.getItem("eToken");

    if (!this.token) {
      this.isLogin = true;
    }

  }

  SignOut() {
    localStorage.removeItem("eToken");
    this.isLogin = false;
    this._ToastrService.info("Sign out sucessfully")
    this._Router.navigate(['/home'])
    location.reload();
  }

}
