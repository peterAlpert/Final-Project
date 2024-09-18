import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  mainSrc:string ="assets/watch1.jpg"

  changeImage() {
    this.mainSrc ="assets/watch2.jpg"

  }

  resetImage() {
    this.mainSrc = "assets/watch1.jpg";
  }



}
