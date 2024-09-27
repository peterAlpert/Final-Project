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

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, JsonPipe, FormsModule, SpinnerComponent, RouterLink],
  templateUrl: './product.component.html',
  styles: '.in-wishlist {color: red}'
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
  cartItem: ICartItem = {} as ICartItem


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
    }, 1500);

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

  deleteProd(prod: IProduct) {
    this._ProductService.delete(prod.id).subscribe({
      next: (res) => { console.log(res); },
      error: (err) => {
        console.log(err);
      }
    })

  }


  //to color hreart to red when clicked
  wishlistIds: number[] = [];
  toggleWishlist(productId: number) {
    const index = this.wishlistIds.indexOf(productId);
    if (index === -1) {
      this.wishlistIds.push(productId);
    } else {
      this.wishlistIds.splice(index, 1);
    }
  }
  isInWishlist(productId: number): boolean {
    return this.wishlistIds.includes(productId);
  }

  addToWhishlist(prod: IProduct) {
    this.whishlistData = {
      "userId": this.userId,
      "productId": prod.id
    }

    if (!this.IsLogeed()) {
      this._ToastrService.warning("Please login first")
      this._Router.navigate(['/Login'])
    } else {
      this._WhishlistService.add(this.whishlistData).subscribe({
        next: (res: any) => {
          this.toggleWishlist(prod.id)
          this._ToastrService.success(`${prod.name} : added to wishlist`);
        },
        error: () => this._ToastrService.warning("Product is Already Exists in Your Wishlist")
      })
    }
  }

  addToCart(prod: IProduct) {
    this.cartItem = {
      'id': 1,
      'price': prod.price,
      'userId': this.userId,
      'productId': prod.id,
      'quantity': 1,
      'product': prod
    }

    if (!this.IsLogeed()) {
      this._ToastrService.warning("Please login first")
      this._Router.navigate(['/Login'])
    }
    else {
      this._CartService.add(this.cartItem).subscribe({
        next: res => {
          if (res) {
            this._ToastrService.success(`${prod.name} : added to you cart successfully`)

          }
          else {
            this._ToastrService.warning(`${prod.name} : Already exists in you cart`)
            var count = 0
            this._SharedService.cartProdQty.subscribe(res => count = res)
            console.log(count);

            this._SharedService.updateCartProdQty(count = count + 1)
            console.log(count);

          }
        },
        error: err => console.log(err)
      })

    }

  }

  IsLogeed(): boolean {
    var token = localStorage.getItem('token')!

    if (token)
      return true
    else
      return false

  }

  mainSrc: string = "assets/watch1.jpg"
  changeImage() {
    this.mainSrc = "assets/watch2.jpg"

  }
  resetImage() {
    this.mainSrc = "assets/watch1.jpg";
  }
}
