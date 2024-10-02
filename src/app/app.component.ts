import { NavbarComponent } from './Components/Layout/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, ROUTES, Router, Routes } from '@angular/router';
import { FooterComponent } from "./Components/Layout/footer/footer.component";
import { HomeComponent } from './Components/home/home.component';

import { RegisterationComponent } from "./Components/Authentication/registeration/registeration.component";
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, RouterModule, HomeComponent, RegisterationComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  constructor(private location: Location) { }
  title = 'Final-Project';

  goToUp(): void {
    window.scrollTo(0, 0)
  }

  goBack() {
    this.location.back();
  }



}
