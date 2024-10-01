import { IProduct } from './../../../../Core/interfaces/iproduct';
import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../../Core/Services/product.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../../../Core/interfaces/icategory';
import { Ibrand } from '../../../../Core/interfaces/ibrand';
import { CategoryService } from '../../../../Core/Services/category.service';
import { BrandService } from '../../../../Core/Services/brand.service';

@Component({
  selector: 'app-update-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './update-product.component.html',
})
export class UpdateProductComponent implements OnInit {
  productData: IProduct = {} as IProduct;
  CategoryName: string = "";
  BrandName: string = "";
  updateProductForm: FormGroup;
  productId:number=0;

  constructor(
    private _ProductService: ProductService,
    private _CategoryService:CategoryService,
    private _BrandService:BrandService,
    private _ToastrService: ToastrService,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute:ActivatedRoute
  ) {
    this.updateProductForm = this._FormBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      stockQuantity: ['', Validators.required],
      brand:[null],
      category:[null],
      createdAt:[Date.now],
      updatedAt:[Date.now],
      categoryId: ['', Validators.required],
      brandId: ['', Validators.required],
    });


    this.productId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'))

    console.log(this.productId);

  }

  ngOnInit(): void {
    this._ProductService.GetByID(this.productId).subscribe({
      next:(response)=>{
        this.productData = response;
        console.log(this.productData);
        console.log(this.updateProductForm);


      },
      error:(err)=>{
        console.log(err);

      }
    })


   setTimeout(() => {

    this.updateProductForm.patchValue(this.productData);
   // this.updateProductForm.controls['categoryId'] = this.CategoryName

    this._CategoryService.getById(this.productData.categoryId).subscribe({
      next:(response)=>{
        //console.log(response);
        this.CategoryName = response.name

        console.log(this.CategoryName);

      },
      error:(err)=>{
        console.log(err);


      }
    })


    this._BrandService.getById(this.productData.brandId).subscribe({
      next:(response)=>{
        console.log(response);
        this.BrandName = response.name
        console.log(this.BrandName);



      },
      error:(err)=>{
        console.log(err);


      }
    })
   }, 100);



  }

  updateData(): void {
    if (this.updateProductForm.valid) {
      const updatedProduct: IProduct = this.updateProductForm.value;
      this._ProductService.update(this.productData).subscribe({
        next: (response) => {
          this._ToastrService.success("Your Product Data Updated Successfully");
          this.productData = response;
        },
        error: (err) => {
          console.error(err);
          this._ToastrService.error("An error occurred while updating the product");
        }
      });
    } else {
      this._ToastrService.warning("Please fill all required fields");
    }
  }
}
