import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { categoryApiRoutes } from '../category-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { CategoryDto } from '../dtos/category.dto';
import { CategoryNameDto } from '../dtos/category-name.dto';

@Injectable({
    providedIn: 'root',
})
export class CategoryApiService {
    constructor(private readonly apiService: CoreApiService) {}

    getCategories() {
        return this.apiService.request<CategoryDto[]>(
            categoryApiRoutes.GET_categories,
            new ApiOptions() as ApiOptionsBody
        );
    }

    createCategory(name: string) {
        return this.apiService.request<CategoryNameDto, void>(
            categoryApiRoutes.POST_createCategory,
            new CategoryNameDto({ name }),
            new ApiOptions() as ApiOptionsBody
        );
    }

    updateCategory(categoryId: number, name: string) {
        return this.apiService.request<CategoryNameDto, void>(
            categoryApiRoutes.PATCH_updateCategory,
            new CategoryNameDto({ name }),
            new ApiOptions({ routeParams: { categoryId } }) as ApiOptionsBody
        );
    }

    deleteCategory(categoryId: number) {
        return this.apiService.request<void>(
            categoryApiRoutes.DELETE_removeCategory,
            new ApiOptions({ routeParams: { categoryId } }) as ApiOptionsBody
        );
    }
}
