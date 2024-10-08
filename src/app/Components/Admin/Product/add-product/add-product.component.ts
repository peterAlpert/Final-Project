import { BrandService } from './../../../../Core/Services/brand.service';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { IProduct } from '../../../../Core/interfaces/iproduct';
import { ProductService } from '../../../../Core/Services/product.service';
import { Icategory } from '../../../../Core/interfaces/icategory';
import { Ibrand } from '../../../../Core/interfaces/ibrand';
import { CategoryService } from '../../../../Core/Services/category.service';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-product.component.html',
  styles: ``,
})
export class AddProductComponent implements OnInit {
  productData: IProduct = {} as IProduct;
  Categories: Icategory[] = [];
  Brands: Ibrand[] = [];
  files: File[] = [];

  constructor(
    private _ProductService: ProductService,
    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _ToastrService: ToastrService
  ) {}

  addProductForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    stockQuantity: new FormControl('', [Validators.required]),
    images: new FormControl([], [Validators.required]),
    categoryId: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this._CategoryService.getAll().subscribe({
      next: (response) => {
        //console.log(response);
        this.Categories = response;
      },
      error: (err) => {
        console.log(err);
      },
    });

    this._BrandService.getAll().subscribe({
      next: (response) => {
        console.log(response);
        this.Brands = response;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  addProduct(): void {
    const formData = new FormData();
    this.files.forEach((file) => {
      formData.append('files', file);
    });
    formData.append('Name', this.addProductForm.get('name')?.value);
    formData.append(
      'Description',
      this.addProductForm.get('description')?.value
    );
    formData.append('Price', this.addProductForm.get('price')?.value);
    formData.append(
      'StockQuantity',
      this.addProductForm.get('stockQuantity')?.value
    );
    formData.append('CategoryId', this.addProductForm.get('categoryId')?.value);
    formData.append('BrandId', this.addProductForm.get('brandId')?.value);

    this.productData = this.addProductForm.value;

    ///Call the service -->
    this._ProductService.addProduct(formData).subscribe({
      next: () => {
        this.addProductForm.reset();
        this._ToastrService.success(
          `Product Add successful in website ElDokan`
        );
      },
      error: () =>
        this._ToastrService.warning(
          `Product does not Add successful in website ElDokan`
        ),
    });
  }

  onFileSelected(event: any) {
    const files: FileList = event.target.files;
    this.files = [];

    for (let i = 0; i < files.length; i++) {
      this.files.push(files[i]);
    }

    console.log(this.files);
  }
}
