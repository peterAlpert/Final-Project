import { CategoryService } from './../../../../Core/Services/category.service';
import { Component } from '@angular/core';
import { Icategory } from '../../../../Core/interfaces/icategory';
import { ToastrService } from 'ngx-toastr';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-category',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './view-all-category.component.html',
  styleUrl: './view-all-category.component.css'
})
export class ViewAllCategoryComponent {

  categories: Icategory[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private _CategoryService: CategoryService, private _ToastrService: ToastrService) { }


  ngOnInit(): void {
    this.loadBrand();
  }

  loadBrand(): void {
    this.loading = true;

    this._CategoryService.getAll().subscribe({
      next: (data) => {
        this.categories = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load categories. Please try again later.';
        this.loading = false;
        console.error('Error fetching categories :', err);
      }
    });
  }

  deleteCategory(cateId: number) {
    this._CategoryService.remove(cateId).subscribe({
      next: res => {
        this.categories = this.categories.filter(item => item.id != cateId)
        this._ToastrService.success("Category Deleted")
      },
      error: err => console.log(err)

    })
  }

}
