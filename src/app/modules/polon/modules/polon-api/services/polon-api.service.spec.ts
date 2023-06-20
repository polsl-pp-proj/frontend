import { TestBed } from '@angular/core/testing';

import { PolonApiService } from './polon-api.service';

describe('PolonApiService', () => {
    let service: PolonApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PolonApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
