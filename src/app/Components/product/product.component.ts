import { ICartItem } from './../../Core/interfaces/icart-item';
import { IFavlistuserproduct } from './../../Core/interfaces/ifavlistuserproduct';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { IProduct } from '../../Core/interfaces/iproduct';
import { ProductService } from '../../Core/Services/product.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../Core/Services/auth.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { WhishlistService } from '../../Core/Services/whishlist.service';
import { Observable } from 'rxjs';
import { CartService } from '../../Core/Services/cart.service';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, JsonPipe, FormsModule],
  templateUrl: './product.component.html',
  styles: ''
})
export class ProductComponent implements OnInit {
  products: IProduct[] = [] as IProduct[];
  prod: IProduct = {} as IProduct
  searchInput: string = "";
  userId: any
  token: string | null = ""
  whishlistData: IFavlistuserproduct = {} as IFavlistuserproduct
  heartStyle: string = "fa-regular fa-heart fa-2xl d-flex justify-content-end"
  isFav: boolean = false
  cartItem: ICartItem = {} as ICartItem


  constructor(
    private _ProductService: ProductService,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _WhishlistService: WhishlistService,
    private _CartService: CartService
  ) { }

  ngOnInit(): void {
    this._ProductService.GetAll().subscribe({
      next: (res: any) => { this.products = res; console.log(res); },
      error: (err: any) => { console.log(err); }
    })

    this._AuthService.getUserId().subscribe({
      next: (res) => {
        console.log(res)

        this.userId = res
      }
    })

  }

  search() {
    if (this.searchInput != "") {
      this._ProductService.search(this.searchInput).subscribe({
        next: (res) => {
          this.products = res;
          if (res.length == 0) {
            this._ToastrService.error(`${this.searchInput} Not Found `)
            this.searchInput = ""
          }
        },
        error: (err) => {
          console.log(err);
        }
      })
    }
  }

  goToDetails(prod: IProduct) {
    this._Router.navigateByUrl(`product/${prod.id}`)
    // this._ProductService.GetByID(prod.id).subscribe({
    //   next: (res) => {
    //     this.prod = res;
    //     this._Router.navigateByUrl(`product/${res.id}`)
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   }
    // })
  }

  deleteProd(prod: IProduct) {
    this._ProductService.delete(prod.id).subscribe({
      next: (res) => { console.log(res); },
      error: (err) => {
        console.log(err);
      }
    })

  }

  addToWhishlist(prod: IProduct) {

    this.whishlistData = {
      "userId": this.userId,
      "productId": prod.id
    }

    this._WhishlistService.add(this.whishlistData).subscribe({
      next: (res: any) => {
        if (!this.isFav) {
          this.isFav = true;
          this.heartStyle = "fa-solid text-danger fa-heart fa-2xl d-flex justify-content-end"
        }
        else {
          this.isFav = false;
          this.heartStyle = "fa-regular fa-heart fa-2xl d-flex justify-content-end"
        }

        this._ToastrService.success("added to wishlist");
      },
      error: (err) => { console.log(err); console.log(this.isFav); }
    })

  }


  changeColorToRed() {
    if (this.heartStyle == "fa-regular fa-heart fa-2xl d-flex justify-content-end")
      this.heartStyle = "fa-solid text-danger fa-heart fa-2xl d-flex justify-content-end"
  }

  changeColorToWhite() {
    if (this.heartStyle == "fa-solid text-danger fa-heart fa-2xl d-flex justify-content-end")
      this.heartStyle = "fa-regular fa-heart fa-2xl d-flex justify-content-end"

  }

  addToCart(prod: IProduct) {

    this.cartItem = {
      'price': prod.price,
      'cartItemId': 1,
      'userId': this.userId,
      'productId': prod.id,
      'quantity': 1
    }

    this._CartService.add(this.cartItem).subscribe({
      next: res => this._ToastrService.success(`product (${prod.name}) added to you cart successfully`),
      error: err => console.log(err)
    })

  }

  mainSrc: string = "assets/watch1.jpg"
  changeImage() {
    this.mainSrc = "assets/watch2.jpg"

  }
  resetImage() {
    this.mainSrc = "assets/watch1.jpg";
  }
}
