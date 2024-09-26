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
  orderList: Iorder[] = []


  constructor(
    private _OrderService: OrderService,
    private _Router: Router
  ) {
  }

  ngOnInit(): void {
    this._OrderService.getAll().subscribe({
      next: res => { this.orderList = res; }
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
