import { SharedService } from './../../Core/Services/shared.service';

import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from '../sidebar/sidebar.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule, SidebarComponent],
  templateUrl: './dashboard.component.html',

  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  isSidebarActive = false;


  constructor(
    private _SharedService: SharedService
  ) {

  }

  toggleSidebar(): void {
    this.isSidebarActive = !this.isSidebarActive;
  }


  isProductsSubmenuOpen = false;

  toggleProductsSubmenu() {
    this.isProductsSubmenuOpen = !this.isProductsSubmenuOpen;
  }

  signOut() {
    this._SharedService.SignOut();
  }

}
