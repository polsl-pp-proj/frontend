import { TestBed } from '@angular/core/testing';

import { StudentshipApiService } from './studentship-api.service';

describe('StudentshipApiService', () => {
    let service: StudentshipApiService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StudentshipApiService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
