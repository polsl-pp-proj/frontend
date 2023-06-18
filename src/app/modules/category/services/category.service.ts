import { Injectable } from '@angular/core';
import { CategoryApiService } from '../modules/category-api/services/category-api.service';
import { of, tap } from 'rxjs';
import { CategoryDto } from '../modules/category-api/dtos/category.dto';

@Injectable({
    providedIn: 'root',
})
export class CategoryService {
    private categories!: CategoryDto[];

    constructor(private readonly categoryApiService: CategoryApiService) {}

    getCategories(force: boolean = false) {
        if (this.categories && !force) {
            return of(this.categories);
        }
        return this.categoryApiService.getCategories().pipe(
            tap({
                next: (categories) => {
                    this.categories = categories;
                },
            })
        );
    }

    createCategory(name: string) {
        return this.categoryApiService.createCategory(name);
    }

    updateCategory(categoryId: number, name: string) {
        return this.categoryApiService.updateCategory(categoryId, name);
    }

    deleteCategory(categoryId: number) {
        return this.categoryApiService.deleteCategory(categoryId);
    }
}
