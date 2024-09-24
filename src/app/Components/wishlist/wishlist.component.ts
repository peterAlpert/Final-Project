import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WhishlistService } from '../../Core/Services/whishlist.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { IWishlistitems } from '../../Core/interfaces/iwishlistitems';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../spinner/spinner.component';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [JsonPipe, CommonModule, SpinnerComponent],
  templateUrl: './wishlist.component.html',
  styles: ''
})
export class WishlistComponent implements OnInit {
  isLoading: Boolean = true
  userId: number = 0;
  wishlistItems: IWishlistitems[] = [] as IWishlistitems[]

  constructor(
    private _WhishlistService: WhishlistService,
    private _ToastrService: ToastrService
  ) { }

  ngOnInit() {
    //get UserID
    this.userId = Number(localStorage.getItem("userId"))

    //get all items in wishlist
    this._WhishlistService.getAll(this.userId).subscribe({
      next: res => {
        this.wishlistItems = res
        this.isLoading = false
      },
      error: err => {
        this._ToastrService.warning("No Items in Your Wishlist")
        this.isLoading = false
      }
    })
  }

  removeItemFromList(productId: number) {
    this._WhishlistService.delete(this.userId, productId).subscribe({
      next: () => {
        this._ToastrService.show("Product deleted from your wishlist")
        this.wishlistItems = this.wishlistItems.filter(item => item.productId != productId)
      },
      error: err => console.log(err)
    })

  }

}
