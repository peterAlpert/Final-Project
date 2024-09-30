import { Component } from '@angular/core';
import { Ibrand } from '../../../../Core/interfaces/ibrand';
import { BrandService } from '../../../../Core/Services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-brand.component.html',
  styles: ``
})
export class AddBrandComponent {


  brandData : Ibrand={} as Ibrand;

  constructor(
    private _BrandService:BrandService,
    private _ToastrService: ToastrService
    ) { }



  addBrandForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),

  })


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
