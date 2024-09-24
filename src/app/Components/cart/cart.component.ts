import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../Core/interfaces/iproduct';
import { CartService } from './../../Core/Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../spinner/spinner.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SpinnerComponent, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  isLoading: boolean = true
  cartItems: any

  userId: number = 0


  constructor(
    private _CartService: CartService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {

    //get UserID
    this.userId = Number(localStorage.getItem("userId"))

    //get all items in cart
    this._CartService.getCartByUserId(this.userId).subscribe({
      next: res => {
        this.cartItems = res
        this.isLoading = false
      }
      ,
      error: err => {
        this._ToastrService.warning("Not Items in Your Cart")
        this.isLoading = false
      }
    })

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
