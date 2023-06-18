import { TestBed } from '@angular/core/testing';

import { FavoriteApiService } from './favorite-api.service';

describe('FavoriteApiService', () => {
    let service: FavoriteApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FavoriteApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
