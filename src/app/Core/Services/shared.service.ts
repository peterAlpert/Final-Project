import { Injectable, OnInit } from '@angular/core';
import { AuthService } from './auth.service';
import { WhishlistService } from './whishlist.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService implements OnInit {
  userId: number = 0;
  wishListCount: number = 0
  token: string = ""

  constructor(
    private _AuthService: AuthService,
    private _WhishlistService: WhishlistService
  ) {

  }

  ngOnInit(): void {
    this._AuthService.getUserId().subscribe({
      next: res => this.userId = res
    })
    setTimeout(() => {
      this._WhishlistService.getAll(this.userId).subscribe({ next: res => this.wishListCount = res.length })

    }, 1000);
  }
}
