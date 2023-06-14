import { TestBed } from '@angular/core/testing';

import { PolonService } from './polon.service';

describe('PolonService', () => {
    let service: PolonService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(PolonService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
