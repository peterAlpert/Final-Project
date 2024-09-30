import { ToastrService } from 'ngx-toastr';
import { ReviewService } from './../../../Core/Services/review.service';
import { Ireview } from './../../../Core/interfaces/ireview';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Location } from '@angular/common';
@Component({
  selector: 'app-add-review',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent {
  review: Ireview = {} as Ireview
  reviewForm: FormGroup;
  rating: number = 0;
  prodId: number = 0;
  userId: number = 0;

  constructor(
    private _FormBuilder: FormBuilder,
    private _ActivatedRoute: ActivatedRoute,
    private _ReviewService: ReviewService,
    private _ToastrService: ToastrService,
    private _Location: Location
  ) {
    this.reviewForm = this._FormBuilder.group({
      comment: ['', Validators.required],
    });

    //get product id
    this.prodId = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    console.log(this.prodId);

    //get user id
    this.userId = Number(localStorage.getItem('userId'))
  }


  submitForm() {
    if (this.reviewForm.valid) {

      this.review = {
        productId: this.prodId,
        userId: this.userId,
        comment: this.reviewForm.value.comment,
        rating: this.rating
      }
      console.log(this.review);


      this._ReviewService.add(this.review).subscribe({
        next: () => { this._ToastrService.success("Yor Review added successfully"); this._Location.back() },
        error: err => console.log(err)
      })
    }
  }
}


