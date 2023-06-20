import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { favoriteApiRoutes } from '../favorite-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';

@Injectable({
    providedIn: 'root',
})
export class FavoriteApiService {
    constructor(private readonly apiService: CoreApiService) {}

    getSimpleFavorites() {
        return this.apiService.request<number[]>(
            favoriteApiRoutes.GET_simpleFavorites,
            new ApiOptions() as ApiOptionsBody
        );
    }

    getFullFavorites() {
        return this.apiService.request<SimpleProjectDto[]>(
            favoriteApiRoutes.GET_favorites,
            new ApiOptions() as ApiOptionsBody
        );
    }

    addToFavorites(projectId: number) {
        return this.apiService.request<any, void>(
            favoriteApiRoutes.POST_addToFavorites,
            {},
            new ApiOptions({ routeParams: { projectId } }) as ApiOptionsBody
        );
    }

    removeFromFavorites(projectId: number) {
        return this.apiService.request<void>(
            favoriteApiRoutes.DELETE_removeFromFavorites,
            new ApiOptions({ routeParams: { projectId } }) as ApiOptionsBody
        );
    }
}
