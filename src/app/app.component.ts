import { NavbarComponent } from './Components/navbar/navbar.component';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, RouterModule, ROUTES, Router, Routes } from '@angular/router';
import { FooterComponent } from "./Components/footer/footer.component";
import { HomeComponent } from './Components/home/home.component';

import { RegisterationComponent } from "./Components/registeration/registeration.component";
import { AuthService } from './Core/Services/auth.service';
import { SharedService } from './Core/Services/shared.service';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, RouterModule, HomeComponent, RegisterationComponent,],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  title = 'Final-Project';
  userId: number = 0

  constructor(private _SharedService: SharedService) {
  }
  ngOnInit(): void {
    this.userId = this._SharedService.userId
  }




  goToUp(): void {
    window.scrollTo(0, 0)
  }




}
