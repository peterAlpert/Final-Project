import { OrderService } from './../../../Core/Services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Iorder } from '../../../Core/interfaces/iorder';
import { Iorderitem } from '../../../Core/interfaces/iorderitem';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-order-track',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './order-track.component.html',
  styles: ``
})
export class OrderTrackComponent implements OnInit {
  orderId: number = 0
  order: Iorder = {} as Iorder
  orderItems: Iorderitem[] = []

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _OrderService: OrderService
  ) {
    this.orderId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'))

  }

  ngOnInit(): void {
    this._OrderService.getById(this.orderId).subscribe({
      next: res => {
        console.log(res);
        this.order = res
        this.orderItems = res.items;

      },
      error: err => console.log(err)

    })

  }

}
