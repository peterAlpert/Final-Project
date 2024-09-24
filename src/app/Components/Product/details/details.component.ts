import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from '../../../Core/interfaces/iproduct';
import { ProductService } from '../../../Core/Services/product.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
  prodID: number = 0
  prodcut: IProduct = {} as IProduct

  constructor(
    private _ActivatedRoute: ActivatedRoute,
    private _ProductService: ProductService
  ) {
    this.prodID = Number(this._ActivatedRoute.snapshot.paramMap.get('id'));
    console.log(this.prodID);

  }
  ngOnInit(): void {
    this._ProductService.GetByID(this.prodID).subscribe({
      next: (res) => {
        this.prodcut = res;
        console.log(this.prodcut);

      },
      error: (err) => {
        console.log(err);
      }
    })

  }

}
