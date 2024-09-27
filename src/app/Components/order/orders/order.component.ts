import { OrderService } from '../../../Core/Services/order.service';
import { Component, OnInit } from '@angular/core';
import { Iorder } from '../../../Core/interfaces/iorder';
import { Iorderitem } from '../../../Core/interfaces/iorderitem';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [JsonPipe, DatePipe, RouterLink, CurrencyPipe],
  templateUrl: './order.component.html',
  styles: ''
})
export class OrderComponent implements OnInit {
  orderList: any
  userId: number = 0


  constructor(
    private _OrderService: OrderService,
    private _Router: Router
  ) {

    this.userId = Number(localStorage.getItem('userId'))
  }

  ngOnInit(): void {
    this._OrderService.getByUserId(this.userId).subscribe({
      next: res => {
        this.orderList = res; console.log(res);
      }
      ,
      error: err => console.warn(err)
    })
  }

  goToDetails(orderId: number) {
    this._Router.navigate(['order/details', orderId])

  }

  goToTrack(orderId: number) {
    this._Router.navigate(['order/track', orderId])

  }

}
