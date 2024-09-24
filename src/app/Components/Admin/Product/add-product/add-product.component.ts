import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../Core/interfaces/iproduct';
import { ProductService } from '../../../../Core/Services/product.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styles: ``
})
export class AddProductComponent {

  productData: IProduct = {} as IProduct;

  constructor(
    private _ProductService: ProductService,
    private _ToastrService: ToastrService
  ) { }

  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stockQuantity: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),

  })

  addProduct(): void {
    this.productData = this.addProductForm.value;
    this._ProductService.addProduct(this.productData).subscribe({
      next: () => this._ToastrService.success(`Product Add successful in website ElDokan`),
      error: () => this._ToastrService.warning(`Product does not Add successful in website ElDokan`)
    })
  }

}
