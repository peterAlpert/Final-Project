import { state } from '@angular/animations';
import { OrderService } from '../../../Core/Services/order.service';
import { Component, OnInit } from '@angular/core';
import { Iorder } from '../../../Core/interfaces/iorder';
import { Iorderitem } from '../../../Core/interfaces/iorderitem';
import { CurrencyPipe, DatePipe, JsonPipe } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { OrderTrackComponent } from "../order-track/order-track.component";

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [JsonPipe, DatePipe, RouterLink, CurrencyPipe, OrderTrackComponent],
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

  status: string = ''
  ngOnInit(): void {
    this._OrderService.getByUserId(this.userId).subscribe({
      next: res => {
        this.orderList = res;

        for (let i = 0; i < this.orderList.length; i++) {
          switch (this.orderList[i].status) {
            case 0:
              this.status = 'Processing'
              break;

            case 1:
              this.status = 'Shipped'
              break;

            case 2:
              this.status = 'Delivered'
              break;

            case 3:
              this.status = 'Canceled'
              break;
          }
          console.log(this.status);

        }

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
