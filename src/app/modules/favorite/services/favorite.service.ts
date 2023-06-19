import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { FavoriteApiService } from '../modules/favorite-api/services/favorite-api.service';
import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';

@Injectable({
    providedIn: 'root',
})
export class FavoriteService {
    private simpleFavorites = new BehaviorSubject<number[]>([]);

    constructor(private readonly favoriteApiService: FavoriteApiService) {}

    fetchFavorites() {
        return this.favoriteApiService.getSimpleFavorites().pipe(
            tap((favoriteIds) => this.simpleFavorites.next(favoriteIds)),
            map(() => {
                return;
            })
        );
    }

    getFullFavorites() {
        return this.favoriteApiService.getFullFavorites();
    }

    clearFavorites() {
        this.simpleFavorites.next([]);
    }

    isFavorite(projectId: number) {
        return this.simpleFavorites.pipe(
            map((favoriteIds) => {
                return favoriteIds.some(
                    (favoriteId) => favoriteId === projectId
                );
            })
        );
    }

    addToFavorites(projectId: number) {
        const favorites = new Set<number>(this.simpleFavorites.value);
        if (!favorites.has(projectId)) {
            favorites.add(projectId);
            this.simpleFavorites.next(Array.from(favorites));
        }
        return this.favoriteApiService.addToFavorites(projectId).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 404) {
                        return this.fetchFavorites();
                    }
                }
                throw err;
            })
        );
    }

    removeFromFavorites(projectId: number) {
        const favorites = new Set<number>(this.simpleFavorites.value);
        if (favorites.has(projectId)) {
            favorites.delete(projectId);
            this.simpleFavorites.next(Array.from(favorites));
        }
        return this.favoriteApiService.removeFromFavorites(projectId).pipe(
            catchError((err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status !== 404) {
                        return this.fetchFavorites();
                    }
                }
                throw err;
            })
        );
    }
}
