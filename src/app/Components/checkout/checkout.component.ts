import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from './../../Core/Services/checkout.service';
import { CartService } from './../../Core/Services/cart.service';
import { Component, OnInit } from '@angular/core';
import { ICartItem } from '../../Core/interfaces/icart-item';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css'
})
export class CheckoutComponent implements OnInit {
  proceedToCheckout: any
  userId: number = 0
  orderId: number = 0
  cartItems: ICartItem[] = []
  billingForm: FormGroup
  orderForm: FormGroup;


  constructor(
    private _CartService: CartService,
    private _CheckoutService: CheckoutService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService
  ) {

    this.userId = Number(localStorage.getItem('userId'))

    this.orderForm = this._FormBuilder.group({
      deliveryMethod: [false, Validators.required],
      paymentMethod: [false, Validators.required]
    });

    this.billingForm = this._FormBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      companyName: [''],
      country: ['', Validators.required],
      streetAddress: ['', Validators.required],
      townCity: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      postCode: [''],
      orderNotes: ['']
    });

  }

  ngOnInit(): void {

    this._CartService.getcartByUserId(this.userId).subscribe({
      next: res => {
        this.cartItems = res.cartItems;
        console.log(res);

      },
      error: err => console.log(err)
    })
  }


  onSubmit() {
    const checkout = {
      'userID': this.userId,
      'cartItems': this.cartItems
    }

    const placeOrderDTO = {
      'OrderId': this.orderId,
      'billingDetails': this.billingForm.value,
      "shipping": this.orderForm.get('deliveryMethod')?.value,
      'paymentMethod': this.orderForm.get('paymentMethod')?.value,
    }

    if (this.orderForm.valid && this.billingForm.valid) {

      //proceed to checkout to ceate order
      this._CheckoutService.proceedToCheckout(checkout).subscribe({
        next: res => this.orderId = res.id,
        error: err => console.warn(checkout)

      })

      //placr order 
      this._CheckoutService.placeOrder(placeOrderDTO).subscribe({
        next: res => {
          this._ToastrService.success("Your Order Placed Successfully, check your email for order id to track Your order"); console.log(res);
        },
        error: err => console.warn(err)
      })
    }
    else {
      this._ToastrService.warning("Please fill All required fields")
    }
  }

}
