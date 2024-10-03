import { SharedService } from './../../../Core/Services/shared.service';
import { ReviewService } from './../../../Core/Services/review.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../Core/interfaces/iproduct';
import { ProductService } from '../../../Core/Services/product.service';
import { Ireview } from '../../../Core/interfaces/ireview';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { environment } from '../../../../environments/environment';
import { filter } from 'rxjs';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css',
})
export class DetailsComponent implements OnInit {
  prodID: number = 0;
  prodcut: any = [];
  reviews: Ireview[] = [];
  heartStyle = 'fa-regular fa-heart fa-2xl';

  stars: number[] = Array(5).fill(0);
  mainImage: string = '';
  CanAddComment: boolean = false;
  userId: number = 0;
  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService,
    private _ReviewService: ReviewService,
    private _SharedService: SharedService
  ) {
    this.prodID = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    console.log(this.prodID);
  }
  ngOnInit(): void {
    this.userId = Number(localStorage.getItem('userId'));
    this._ProductService.GetByID(this.prodID).subscribe({
      next: (res) => {
        this.prodcut = res;
        if (
          this.prodcut &&
          this.prodcut.images &&
          this.prodcut.images.length > 0
        ) {
          this.mainImage = this.prodcut.images[0];
        }
      },
      error: (err) => console.error(err),
    });

    this._ReviewService.getByProdId(this.prodID).subscribe({
      next: (res) => {
        this.reviews = res;
        if (this.reviews.length > 0) {
          this.reviews.filter((rev) => {
            rev.userId == this.userId
              ? (this.CanAddComment = true)
              : (this.CanAddComment = false);
          });
        }
      },
      error: (err) => console.error(err),
    });
  }

  setMainImage(image: string) {
    this.mainImage = image;
  }

  getImageUrl(imageName: string): string {
    return `${environment.baseUrlForImage}/${imageName}`;
  }

  addToCart() {
    if (this.prodcut) {
      this._SharedService.addToCart(this.prodcut);
    }
  }

  addToWishlist() {
    if (this.prodcut) {
      this._SharedService.addToWhishlist(this.prodcut);
      this.heartStyle = 'fa-solid text-danger fa-heart';
    }
  }
}
