import { Component } from '@angular/core';
import { BrandService } from '../../../../Core/Services/brand.service';
import { ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Ibrand } from '../../../../Core/interfaces/ibrand';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-view-all-brand',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './view-all-brand.component.html',
  styleUrl: './view-all-brand.component.css'
})
export class ViewAllBrandComponent {

 Brands: Ibrand[] = [] ;
  loading: boolean = true;
  error: string | null = null;

  constructor(private _BrandService : BrandService,private _ToastrService:ToastrService) {}


  ngOnInit(): void {
    this.loadBrand();
  }

  loadBrand(): void {
    this.loading = true;

    this._BrandService.getAll().subscribe({
      next: (data) => {
        this.Brands = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load Brands. Please try again later.';
        this.loading = false;
        console.error('Error fetching Brands:', err);
      }
    });
  }

}
