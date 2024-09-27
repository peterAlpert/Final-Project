
import { ToastrService } from 'ngx-toastr';
import { CartService } from './../../Core/Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { SpinnerComponent } from '../Layout/spinner/spinner.component';
import { RouterLink } from '@angular/router';
import { SharedService } from '../../Core/Services/shared.service';
import Swal from 'sweetalert2';
import { ICart } from '../../Core/interfaces/icart';
import { ICartItem } from '../../Core/interfaces/icart-item';
import { JsonPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [SpinnerComponent, RouterLink, JsonPipe],
  templateUrl: './cart.component.html',
  styles: ''
})
export class CartComponent implements OnInit {
  isLoading: boolean = true

  cart: ICart = {} as ICart
  items: ICartItem[] = []
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
    this._CartService.getcartByUserId(this.userId).subscribe({
      next: res => {
        this.cart = res;
        this.items = res.cartItems

        this.isLoading = false
      },
      error: err => {
        this._ToastrService.warning("Not Items in Your Cart")
        this.isLoading = false
      }
    })

    this._SharedService.cartProdQty.subscribe(res => this.productQty = res)

  }

  incQty(prodId: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].productId == prodId) {
        this._CartService.incQty(this.items[i].id).subscribe({
          next: () => {
            this._ToastrService.success("item increased")
            this.items[i].quantity++
          },
          error: err => this._ToastrService.warning(JSON.stringify(err.error))
        })
      }

    }
  }

  decQty(prodId: number) {
    for (let i = 0; i < this.items.length; i++) {
      if (this.items[i].productId == prodId) {
        this._CartService.decQty(this.items[i].id).subscribe({
          next: () => {
            this._ToastrService.success("item decreased");
            this.items[i].quantity--
          },
          error: err => this._ToastrService.warning(JSON.stringify(err.error))
        })
      }

    }

  }

  deleteItem(productId: number) {
    Swal.fire({
      title: 'Are You Sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete Item',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this._CartService.deleteItem(this.userId, productId).subscribe({
          next: () => {
            this._ToastrService.show("Item deleted from cart")
            this.items = this.items.filter((item: any) => item.productId != productId)
            Swal.fire(
              'Done',
              'item Deleted Successfuly',
              'success'
            );
          },
          error: err => {
            Swal.fire(
              'Wrong!',
              'something wrong happened in process',
              'error'
            );
            this._ToastrService.warning(err)

          }
        })
      }
    });



  }


}
