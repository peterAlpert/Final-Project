
import { Component } from '@angular/core';
import { RegisterationComponent } from '../../Components/Authentication/registeration/registeration.component';
import { HomeComponent } from '../../Components/home/home.component';
import { RouterModule, RouterOutlet } from '@angular/router';
import { FooterComponent } from '../../Components/Layout/footer/footer.component';
import { NavbarComponent } from '../../Components/Layout/navbar/navbar.component';

import { Location } from '@angular/common';
import { ContactUsComponent } from '../../Components/Layout/contact-us/contact-us.component';
@Component({
  selector: 'app-website',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent,ContactUsComponent,FooterComponent, RouterModule, HomeComponent, RegisterationComponent],
  templateUrl: './website.component.html',
  styleUrl: './website.component.css'
})
export class WebsiteComponent {
  constructor(private location: Location) { }
  title = 'Final-Project';

  goToUp(): void {
    window.scrollTo(0, 0)
  }

  goBack() {
    this.location.back();
  }

}
