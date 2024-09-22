import { ToastrService } from 'ngx-toastr';
import { IProduct } from '../../Core/interfaces/iproduct';
import { CartService } from './../../Core/Services/cart.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  // cartItems: IProduct[] = [] as IProduct[]
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
        console.log(res);
        this.cartItems = res
      }
      ,
      error: err => { console.log(err); }
    })

  }

  deleteItem(id: number) {
    console.log(this.userId);
    console.log(id);

    this._CartService.deleteItem(this.userId, id).subscribe({
      next: res => this._ToastrService.show("Item deleted from cart"),
      error: err => console.log(err)
    })
  }
}
