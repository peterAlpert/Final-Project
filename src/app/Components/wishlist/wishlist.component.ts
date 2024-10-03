import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { WhishlistService } from '../../Core/Services/whishlist.service';
import { CommonModule, JsonPipe } from '@angular/common';
import { IWishlistitems } from '../../Core/interfaces/iwishlistitems';
import { ToastrService } from 'ngx-toastr';
import { SpinnerComponent } from '../Layout/spinner/spinner.component';
import { SharedService } from '../../Core/Services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [JsonPipe, CommonModule, SpinnerComponent],
  templateUrl: './wishlist.component.html',
  styles: '',
})
export class WishlistComponent implements OnInit {
  isLoading: Boolean = true;
  userId: number = 0;
  wishlistItems: IWishlistitems[] = [] as IWishlistitems[];

  constructor(
    private _WhishlistService: WhishlistService,
    private _ToastrService: ToastrService,
    private _SharedService: SharedService,
    private _Router: Router
  ) {}

  ngOnInit() {
    //get UserID
    this.userId = Number(localStorage.getItem('userId'));

    //get all items in wishlist
    this._WhishlistService.getAll(this.userId).subscribe({
      next: (res) => {
        this.wishlistItems = res;

        this._SharedService.updateWishlistCount(this.wishlistItems.length);
        this.isLoading = false;
      },
      error: (err) => {
        this._ToastrService.warning('No Items in Your Wishlist');
        this.isLoading = false;
      },
    });
  }

  addToCart(item: any) {
    this._SharedService.addToCart(item.product);
  }

  removeItemFromList(productId: number) {
    this._WhishlistService.delete(this.userId, productId).subscribe({
      next: () => {
        this._ToastrService.show('Product deleted from your wishlist');
        this.wishlistItems = this.wishlistItems.filter(
          (item) => item.productId != productId
        );
      },
      error: (err) => console.log(err),
    });
  }

  navigateToProduct(arg0: number) {
    this._Router.navigate(['/product', arg0]);
  }
}
