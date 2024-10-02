import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CheckoutService } from './../../Core/Services/checkout.service';
import { CartService } from './../../Core/Services/cart.service';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICartItem } from '../../Core/interfaces/icart-item';
import { FormGroup, ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { Iitem } from '../../Core/interfaces/iitem';
import { CurrencyPipe } from '@angular/common';
import { IcheckoutRes } from '../../Core/interfaces/icheckout-res';
import { BankTransferComponent } from "../order/bank-transfer/bank-transfer.component";

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [ReactiveFormsModule, CurrencyPipe, BankTransferComponent],
  templateUrl: './checkout.component.html',
  styles: ''
})
export class CheckoutComponent implements OnInit {
  proceedToCheckout: any
  userId: number = 0
  orderId: any
  cartItem: ICartItem[] = []
  billingForm: FormGroup
  orderForm: FormGroup;
  items: Iitem[] = []
  checkoutRes: IcheckoutRes = {} as IcheckoutRes
  isVisible: boolean = false;
  visaForm: FormGroup;


  constructor(
    private _CartService: CartService,
    private _CheckoutService: CheckoutService,
    private _FormBuilder: FormBuilder,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private _ActivatedRoute: ActivatedRoute
  ) {

    this.userId = Number(localStorage.getItem('userId'))

    this.orderForm = this._FormBuilder.group({
      // deliveryMethod: [false, Validators.required],
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


    this.visaForm = this._FormBuilder.group({
      cardNumber: ['', [Validators.required, Validators.pattern('^[0-9]{14}$')]],
      cardHolder: ['', Validators.required],
      expiryDate: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });

  }

  ngOnInit(): void {

    this._CartService.getcartByUserId(this.userId).subscribe({
      next: res => {
        this.cartItem = res.cartItems;
      }
    })

    setTimeout(() => {
      for (let i = 0; i < this.cartItem.length; i++) {
        this.items.push({
          "price": this.cartItem[i].product.price,
          "cartItemId": this.cartItem[i].id,
          "userId": this.userId,
          "productId": this.cartItem[i].productId,
          "quantity": this.cartItem[i].quantity
        })
      }
    }, 100);

    const checkout = {
      'userID': this.userId,
      'cartItems': this.items
    }

    setTimeout(() => {
      this._CheckoutService.proceedToCheckout(checkout).subscribe({
        next: res => this.checkoutRes = res,
        error: err => console.log(err)
      })

    }, 100);

  }


  onSubmit() {
    if (this.orderForm.controls['paymentMethod'].value == 0) {
      this.isVisible = !this.isVisible;
    }
    else if (this.orderForm.controls['paymentMethod'].value == 1) {
      this.placeOrder()
    }


  }

  placeOrder() {
    setTimeout(() => {
      const placeOrderDTO = {
        'orderDTO': this.checkoutRes,
        'userId': this.userId,
        'billingDetails': this.billingForm.value,
        'paymentMethod': this.orderForm.get('paymentMethod')?.value,
      }
      if (this.orderForm.valid && this.billingForm.valid) {

        //placr order 
        this._CheckoutService.placeOrder(placeOrderDTO).subscribe({
          next: res => {
            this._ToastrService.success("Your Order Placed Successfully, check your email for order id to track Your order"); console.log(res);
          },
          error: err => console.warn(err)
        })
        if (this.visaForm.valid) {
          console.log(this.visaForm.value);

        }
      }
      else {
        this._ToastrService.warning("Please fill All required fields")
      }

    }, 500);
  }

}
