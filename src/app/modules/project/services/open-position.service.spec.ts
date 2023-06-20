import { TestBed } from '@angular/core/testing';

import { OpenPositionService } from './open-position.service';

describe('OpenPositionService', () => {
    let service: OpenPositionService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(OpenPositionService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
