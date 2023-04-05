import { TestBed } from '@angular/core/testing';

import { IconVaultService } from './icon-vault.service';

describe('IconVaultService', () => {
    let service: IconVaultService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(IconVaultService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
