
import { Iorder } from './../../../Core/interfaces/iorder';
import { OrderService } from './../../../Core/Services/order.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CurrencyPipe, JsonPipe } from '@angular/common';
import { ProfileService } from '../../../Core/Services/profile.service';
import { Iprofile } from '../../../Core/interfaces/iprofile';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CurrencyPipe, JsonPipe],
  templateUrl: './order-details.component.html',
  styles: ``
})
export class OrderDetailsComponent implements OnInit {
  order: Iorder = {} as Iorder
  orderId: number = 0
  user: Iprofile = {} as Iprofile


  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _OrderService: OrderService,
    private _ProfileService: ProfileService
  ) {

    this.orderId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'))

  }
  ngOnInit(): void {

    this._OrderService.getById(this.orderId).subscribe({
      next: res => this.order = res,
      error: err => console.log(err)

    })

    this._ProfileService.get().subscribe({
      next: res => this.user = res,
      error: err => console.log(err)
    })
  }
}
