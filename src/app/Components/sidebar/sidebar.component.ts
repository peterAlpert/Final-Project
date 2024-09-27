
import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';

interface NavigationItem {
  icon: string;
  title: string;
  link: string;
  showCrud?: boolean;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],

  animations: [
    trigger('crudAnimation', [
      state('closed', style({
        height: '0',
        opacity: '0'
      })),
      state('open', style({
        height: '*',
        opacity: '1'
      })),
      transition('closed <=> open', [
        animate('300ms ease-in-out')
      ])
    ])
  ],
})
export class SidebarComponent {


  isExpanded = false;

  navigationItems: NavigationItem[] = [
    { icon: 'fa-solid fa-gauge', title: 'Dashboard', link: '/dashboard' },
    { icon: 'fa-solid fa-cart-shopping', title: 'Products', link: '/dashboard/products', showCrud: false },
    { icon: 'fa-brands fa-bandcamp', title: 'Brands', link: '/dashboard/brands', showCrud: false },
    { icon: 'fa-solid fa-layer-group', title: 'Category', link: '/dashboard/Category', showCrud: false },
    { icon: 'fa-solid fa-users', title: 'User', link: '/dashboard/User', showCrud: false },

    { icon: 'help-outline', title: 'Help', link: '/dashboard/help' },
    { icon: 'settings-outline', title: 'Settings', link: '/dashboard/settings' },
    { icon: 'log-out-outline', title: 'Sign Out', link: '/logout' }
  ];

  toggleCrud(index: number): void {
    if (this.navigationItems[index].title === 'Products' || this.navigationItems[index].title === 'Brands'  || this.navigationItems[index].title === 'Category'  || this.navigationItems[index].title === 'User') {
      this.navigationItems[index].showCrud = !this.navigationItems[index].showCrud;
    }
  }

  toggleExpand(): void {
    this.isExpanded = !this.isExpanded;
  }




}
