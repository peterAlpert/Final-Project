
import { Component, Output, EventEmitter, ViewChildren } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AddProductComponent } from '../Admin/Product/add-product/add-product.component';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();


  isProductsSubmenuOpen = false;

  toggleProductsSubmenu() {
    this.isProductsSubmenuOpen = !this.isProductsSubmenuOpen;
  }















}
