import { CategoryService } from './../../Core/Services/category.service';
import { Component, OnInit } from '@angular/core';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { Icategory } from '../../Core/interfaces/icategory';
import { ProductComponent } from '../Product/Allproduct/product.component';
//import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CarouselModule, ProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  categories: Icategory[] = [];

  constructor(private _CategoryService: CategoryService) {}

  ngOnInit(): void {
    this._CategoryService.getAll().subscribe({
      next: (res) => (this.categories = res),
      error: (err) => console.log(err),
    });
  }

  mainSrc: string = 'assets/watch1.jpg';

  changeImage() {
    this.mainSrc = 'assets/watch2.jpg';
  }

  resetImage() {
    this.mainSrc = 'assets/watch1.jpg';
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplaySpeed: 1000,

    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: false,
  };

  customOptionsCatgories: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    navText: ['prev', 'next'],
    autoplay: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 1000,
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 1,
      },
      740: {
        items: 1,
      },
      940: {
        items: 1,
      },
    },
    nav: true,
  };
}
