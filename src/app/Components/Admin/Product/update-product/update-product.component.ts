import { IProduct } from './../../../../Core/interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Core/Services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',

})
export class UpdateProductComponent implements OnInit {
  productData: IProduct = {} as IProduct;

  products: IProduct[] = [] ;

  constructor(
    private _ProductService: ProductService,
    private _ToastrService: ToastrService
  ) { }

  updateProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stockQuantity: new FormControl('', [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),

  })

  ngOnInit(): void {


    setTimeout(() => {
      this.updateProductForm.patchValue(this.productData);

    }, 100);
  }






}
