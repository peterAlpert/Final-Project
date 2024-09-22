import { CommonModule } from '@angular/common';
import { Component, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styles: ''
})
export class NavbarComponent implements OnInit, OnChanges {
  isLogin: boolean = false;
  token: string | null
  constructor(private _Router: Router, private _ToastrService: ToastrService) {
    this.token = localStorage.getItem("eToken");

  }
  ngOnChanges(changes: SimpleChanges): void {
    // if (!this.token) {
    //   this.isLogin = true;
    // }
  }
  ngOnInit(): void {
    if (!this.token) {
      this.isLogin = true;
    }
  }

  SignOut() {
    localStorage.removeItem("eToken");
    localStorage.removeItem("userId")
    this.isLogin = false;
    this._ToastrService.info("Sign out sucessfully")
    this._Router.navigate(['/home'])
    location.reload();
  }

}
