import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AuthService } from '../../Core/Services/auth.service';
import { WhishlistService } from '../../Core/Services/whishlist.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { IWishlistitems } from '../../Core/interfaces/iwishlistitems';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [JsonPipe, CommonModule],
  templateUrl: './wishlist.component.html',
  styles: ''
})
export class WishlistComponent implements OnInit {
  userId: number = 0
  wishlistItems: IWishlistitems[] = [] as IWishlistitems[]

  constructor(
    private _AuthService: AuthService,
    private _WhishlistService: WhishlistService,
    private _ToastrService: ToastrService
  ) { }


  ngOnInit() {

    this._AuthService.getUserId().subscribe({
      next: (res) => {
        this.userId = res
      }
    })




    setTimeout(() => {
      this._WhishlistService.getAll(this.userId).subscribe({
        next: res => {
          this.wishlistItems = res; console.log(this.wishlistItems);
        }
        ,
        error: err => { console.log(err); }
      })

    }, 200);

  }



  removeItemFromList(productId: number) {
    console.log(productId)
    console.log(this.userId)

    this._WhishlistService.delete(this.userId, productId).subscribe({
      next: res => { this._ToastrService.info("Product deleted fro your wishlist") },
      error: err => {
        console.log(err);
      }
    })

  }

}
