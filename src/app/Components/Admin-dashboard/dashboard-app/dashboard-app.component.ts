// dashboard.component.ts
import { Component, OnInit } from '@angular/core';

interface NavigationItem {
  icon: string;
  title: string;
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard-app.component.css',
  styleUrls: ['./dashboard-app.component.css']
})
export class DashboardComponent implements OnInit {
  isNavigationActive = false;
  navigationItems: NavigationItem[] = [
    { icon: 'fa-solid fa-gauge', title: 'Brand Name' },
    { icon: 'fa-solid fa-gauge', title: 'Dashboard' },
    { icon: 'fa-solid fa-gauge', title: 'Customers' },
    { icon: 'fa-solid fa-gauge', title: 'Messages' },
    { icon: 'fa-solid fa-gauge', title: 'Help' },
    { icon: 'fa-solid fa-gauge', title: 'Settings' },
    { icon: 'fa-solid fa-gauge', title: 'Password' },
    { icon: 'fa-solid fa-gauge', title: 'Sign Out' }
  ];

  ngOnInit() {
    this.addHoverEffect();
  }

  toggleNavigation() {
    this.isNavigationActive = !this.isNavigationActive;
  }

  private addHoverEffect() {
    const list = document.querySelectorAll(".navigation li");
    list.forEach((item) => {
      item.addEventListener("mouseover", function() {
        list.forEach((el) => el.classList.remove("hovered"));
        // this.classList.add("hovered");
      });
    });
  }
}
