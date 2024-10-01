import { ToastrService } from 'ngx-toastr';
import { Component } from '@angular/core';
import { ProductService } from '../../../../Core/Services/product.service';
import { IProduct } from '../../../../Core/interfaces/iproduct';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
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
        console.log(data);

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



  deleteProd(productId: number) {


    Swal.fire({
      title: 'Are You Sure?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, Delete Item',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this._ProductService.delete(productId).subscribe({
          next: () => {

            this.products = this.products.filter(item => item.id != productId)
            console.log(productId);


            this._ToastrService.show("Item deleted from your Website El-Dokan")

            Swal.fire(
              'Done',
              'item Deleted Successfuly from El-Dokan',
              'success'
            );
          },
          error: err => {
            console.log(productId);

            console.log(err);


            Swal.fire(
              'Wrong!',
              'something wrong happened in process',
              'error'
            );


          }
        })
      }
    });
  }



}
