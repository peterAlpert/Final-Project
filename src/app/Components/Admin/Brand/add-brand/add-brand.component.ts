import { Component, OnInit } from '@angular/core';
import { Ibrand } from '../../../../Core/interfaces/ibrand';
import { BrandService } from '../../../../Core/Services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Icategory } from '../../../../Core/interfaces/icategory';
import { CategoryService } from '../../../../Core/Services/category.service';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-brand.component.html',
  styles: ``
})
export class AddBrandComponent implements OnInit {


  brandData : Ibrand={} as Ibrand;

  Categories :Icategory[] =[]
  constructor(
    private _BrandService:BrandService,
    private _CategoryService:CategoryService,
    private _ToastrService: ToastrService
    ) { }



  addBrandForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),

  })

  ngOnInit(): void {
    this._CategoryService.getAll().subscribe({
      next:(response)=>{
        //console.log(response);
        this.Categories = response


      },
      error:(err)=>{
        console.log(err);


      }
    })

  }


    addBrand(): void {
    this.brandData = this.addBrandForm.value;

    this._BrandService.add(this.brandData).subscribe({
      next:()=>{
        this._ToastrService.success(`Brand Add successfully in website ElDokan`)

      },
      error:()=>{

        this._ToastrService.success(`Brand does not Add successful in website ElDokan`)



      }
    })

  }


}
