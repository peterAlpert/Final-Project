import { BrandService } from './../../../../Core/Services/brand.service';
import { Component, OnInit } from '@angular/core';

import { CategoryService } from '../../../../Core/Services/category.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Icategory } from '../../../../Core/interfaces/icategory';

@Component({
  selector: 'app-update-brand',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-brand.component.html',

})
export class UpdateBrandComponent implements OnInit {
  updateBrandForm: FormGroup;
  BrandId: number = 0;
  category: any
  constructor(

    private _CategoryService: CategoryService,
    private _BrandService: BrandService,
    private _ToastrService: ToastrService,
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute
  ) {
    this.updateBrandForm = this._FormBuilder.group({

      name: ['', Validators.required]

    });

    this.BrandId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'))

  }

  ngOnInit(): void {

    this._BrandService.getById(this.BrandId).subscribe({
      next: (response) => {
        this.category = response;

        console.log(this.category);

      },
      error: (err) => {
        console.log(err);
      }
    })

    setTimeout(() => {
      this.updateBrandForm.patchValue(this.category)

    }, 100);

  }

}
