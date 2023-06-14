import { TestBed } from '@angular/core/testing';

import { StudentshipService } from './studentship.service';

describe('StudentshipService', () => {
    let service: StudentshipService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(StudentshipService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
