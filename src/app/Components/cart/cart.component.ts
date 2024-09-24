import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../Core/interfaces/iproduct';
import { CartService } from './../../Core/Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../Core/Services/shared.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SpinnerComponent, RouterLink],
  templateUrl: './cart.component.html',
  styles: ''
})
export class CartComponent implements OnInit {
  isLoading: boolean = true
  cartItems: any
  productQty: number = 1;

  userId: number = 0


  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService,
    private _SharedService: SharedService
  ) { }

  ngOnInit(): void {

    //get UserID
    this.userId = Number(localStorage.getItem("userId"))

    //get all items in cart
    this._CartService.getCartByUserId(this.userId).subscribe({
      next: res => {
        this.cartItems = res
        this._SharedService.updateCartCount(this.cartItems.length)
        this.isLoading = false
      }
      ,
      error: err => {
        this._ToastrService.warning("Not Items in Your Cart")
        this.isLoading = false
      }
    })

    this._SharedService.cartProdQty.subscribe(res => this.productQty = res)

  }

  incQty() {
    this.productQty++
  }
  decQty() {
    this.productQty--
    if (this.productQty == 0)
      this.productQty = 0
  }

  deleteItem(productId: number) {
    this._CartService.deleteItem(this.userId, productId).subscribe({
      next: () => {
        this._ToastrService.show("Item deleted from cart")
        this.cartItems = this.cartItems.filter((item: any) => item.id != productId)
      },
      error: err => this._ToastrService.warning(err)
    })
  }
}
