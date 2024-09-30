import { ICartItem } from '../../../Core/interfaces/icart-item';
import { IFavlistuserproduct } from '../../../Core/interfaces/ifavlistuserproduct';
import { Component, Directive, Input, OnInit } from '@angular/core';
import { IProduct } from '../../../Core/interfaces/iproduct';
import { ProductService } from '../../../Core/Services/product.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../Core/Services/auth.service';
import { jwtDecode, JwtPayload } from 'jwt-decode';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';
import { WhishlistService } from '../../../Core/Services/whishlist.service';
import { Observable } from 'rxjs';
import { CartService } from '../../../Core/Services/cart.service';
import { SpinnerComponent } from '../../Layout/spinner/spinner.component';
import { SharedService } from '../../../Core/Services/shared.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, JsonPipe, FormsModule, SpinnerComponent, RouterLink, NgxPaginationModule],
  templateUrl: './product.component.html',
  styles: '.redHover:hover {color:red}'
})
export class ProductComponent implements OnInit {
  isLoading: boolean = true;
  products: IProduct[] = [];
  prod: IProduct = {} as IProduct;
  searchInput: string = "";
  userId: any
  favItem = "redColor"
  // token: string | null = ""
  whishlistData: IFavlistuserproduct = {} as IFavlistuserproduct
  heartStyle: string = "fa-regular fa-heart fa-2xl d-flex justify-content-end"
  isFav: boolean = false
  //cartItem: ICartItem = {} as ICartItem
  count: any
  page: number = 1;


  constructor(
    private _ProductService: ProductService,
    private _AuthService: AuthService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _WhishlistService: WhishlistService,
    private _CartService: CartService,
    private _SharedService: SharedService
  ) { }

  ngOnInit(): void {
    setTimeout(() => {
      this._ProductService.GetAll().subscribe({
        next: (res: any) => { this.products = res; this.isLoading = false },
        error: (err: any) => { console.log(err); this.isLoading = true }
      })
    }, 200);

    this._AuthService.getUserId().subscribe({ next: res => this.userId = res })


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
    else {
      this._ProductService.GetAll().subscribe({
        next: res => this.products = res,
        error: err => console.log(err)

      })

    }
  }

  // //to color hreart to red when clicked
  wishlistIds: number[] = [];

  toggleWishlist(productId: number) {
    this._SharedService.toggleWishlist(productId)
  }

  isInWishlist(productId: number): boolean {
    return this._SharedService.wishlistIds.includes(productId);
  }

  addToWhishlist(prod: IProduct) {
    this._SharedService.addToWhishlist(prod)
  }

  addToCart(prod: IProduct) {
    this._SharedService.addToCart(prod);
  }


  mainSrc: string = "assets/watch1.jpg"
  changeImage() {
    this.mainSrc = "assets/watch2.jpg"

  }
  resetImage() {
    this.mainSrc = "assets/watch1.jpg";
  }
}
