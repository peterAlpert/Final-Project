import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ProductService } from '../../../../Core/Services/product.service';
import { IProduct } from '../../../../Core/interfaces/iproduct';
import { CommonModule } from '@angular/common';

import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all-products',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './view-all-products.component.html',
  styleUrl: './view-all-products.component.css'
})
export class ViewAllProductsComponent {

  products: IProduct[] = [] ;
  loading: boolean = true;
  error: string | null = null;

  constructor(private _ProductService: ProductService,private _ToastrService:ToastrService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.loading = true;
    this._ProductService.GetAll().subscribe({
      next: (data) => {
        this.products = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load products. Please try again later.';
        this.loading = false;
        console.error('Error fetching products:', err);
      }
    });
  }


  deleteProd(productID :number) {
    this._ProductService.delete(productID).subscribe({

      next: (response) => {

        this._ToastrService.success("product delete successfuly for Website El-Doken")
       },
      error: (err) => {

        this._ToastrService.warning("product does not delete successfuly for Website El-Doken")

      }
    })

  }

}
