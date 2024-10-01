import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../../../Core/Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Icategory } from '../../../../Core/interfaces/icategory';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrandService } from '../../../../Core/Services/brand.service';
import { Ibrand } from '../../../../Core/interfaces/ibrand';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styles: ``
})
export class AddCategoryComponent implements OnInit {


  caregoryData :Icategory ={} as Icategory;

  Brands :Ibrand[] = [] ;


  constructor(
  private _CategoryService:CategoryService,
  private _BrandService:BrandService,
    private _ToastrService: ToastrService
  ) { }

  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),

  })

  ngOnInit(): void {
    this._BrandService.getAll().subscribe({
      next:(response)=>{
        console.log(response);
        this.Brands = response


      },
      error:(err)=>{
        console.log(err);


      }
    })
  }


  addCategory(): void {
    this.caregoryData = this.addCategoryForm.value;

    this._CategoryService.add(this.caregoryData).subscribe({


      next: () => { this._ToastrService.success(`Category Add successful in website ElDokan`)},
      error: () =>{this._ToastrService.warning(`Category does not Add successful in website ElDokan`)}
    })
  }

}

