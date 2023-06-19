import { TestBed } from '@angular/core/testing';

import { OpenPositionApiService } from './open-position-api.service';

describe('OpenPositionApiService', () => {
    let service: OpenPositionApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OpenPositionApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
