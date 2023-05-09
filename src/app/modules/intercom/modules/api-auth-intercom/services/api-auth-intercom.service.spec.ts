import { TestBed } from '@angular/core/testing';

import { ApiAuthIntercomService } from './api-auth-intercom.service';

describe('ApiAuthIntercomService', () => {
    let service: ApiAuthIntercomService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ApiAuthIntercomService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
