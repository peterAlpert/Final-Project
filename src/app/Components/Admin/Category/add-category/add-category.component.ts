import { Component } from '@angular/core';
import { CategoryService } from '../../../../Core/Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { Icategory } from '../../../../Core/interfaces/icategory';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './add-category.component.html',
  styles: ``
})
export class AddCategoryComponent {


  caregoryData :Icategory ={} as Icategory;


  constructor(
  private _CategoryService:CategoryService,
    private _ToastrService: ToastrService
  ) { }

  addCategoryForm: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    brandId: new FormControl('', [Validators.required]),

  })


  addCategory(): void {
    this.caregoryData = this.addCategoryForm.value;

    this._CategoryService.add(this.caregoryData).subscribe({


      next: () => { this._ToastrService.success(`Category Add successful in website ElDokan`)},
      error: () =>{this._ToastrService.warning(`Category does not Add successful in website ElDokan`)}
    })
  }

}

