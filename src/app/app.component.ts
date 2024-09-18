import { NavbarComponent } from './Components/navbar/navbar.component';
import { Component } from '@angular/core';
import { RouterOutlet, RouterModule, ROUTES, Router, Routes } from '@angular/router';
import { FooterComponent } from "./Components/footer/footer.component";
import { HomeComponent } from './Components/home/home.component';

import { RegisterationComponent } from "./Components/registeration/registeration.component";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, FooterComponent, RouterModule, HomeComponent,  RegisterationComponent, ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Final-Project';

  goToUp():void{
    window.scrollTo(0,0)
  }




}
