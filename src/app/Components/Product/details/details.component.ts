import { SharedService } from './../../../Core/Services/shared.service';
import { ReviewService } from './../../../Core/Services/review.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { IProduct } from '../../../Core/interfaces/iproduct';
import { ProductService } from '../../../Core/Services/product.service';
import { Ireview } from '../../../Core/interfaces/ireview';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  prodID: number = 0
  prodcut: IProduct = {} as IProduct
  reviews: Ireview[] = []
  heartStyle = "fa-regular fa-heart fa-2xl"

  stars: number[] = Array(5);

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
    this.stars.fill(0);

    this._ProductService.GetByID(this.prodID).subscribe({
      next: (res) => {
        this.prodcut = res;
      },
      error: (err) => {
        console.log(err);
      }
    })

    this._ReviewService.getByProdId(this.prodID).subscribe(res => this.reviews = res)

  }

  addToCart() {
    this._SharedService.addToCart(this.prodcut)
  }

  addToWishlist() {
    this._SharedService.addToWhishlist(this.prodcut)
    this.heartStyle = "fa-solid text-danger fa-heart fa-2xl"
  }


}
