import { TestBed, fakeAsync, tick } from '@angular/core/testing';

import { AuthDataService } from './auth-data.service';
import { DataStorageService } from '../../data-storage/services/data-storage.service';

describe('AuthDataService', () => {
    let service: AuthDataService;
    let dataStorageServiceSpy: jasmine.SpyObj<DataStorageService>;

    beforeEach(() => {
        const spy = jasmine.createSpyObj('DataStorageService', ['get', 'set']);

        TestBed.configureTestingModule({
            providers: [
                AuthDataService,
                { provide: DataStorageService, useValue: spy },
            ],
        });

        service = TestBed.inject(AuthDataService);
        dataStorageServiceSpy = TestBed.inject(
            DataStorageService
        ) as jasmine.SpyObj<DataStorageService>;
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should return undefined for authenticated observable initially', (done) => {
        service.authenticated.subscribe((authenticated) => {
            expect(authenticated).toBeUndefined();
            done();
        });
    });

    it('should return undefined for authToken observable initially', (done) => {
        service.authToken.subscribe((authToken) => {
            expect(authToken).toBeUndefined();
            done();
        });
    });

    it('should return undefined for authTokenPayload observable initially', (done) => {
        service.authTokenPayload.subscribe((authTokenPayload) => {
            expect(authTokenPayload).toBeUndefined();
            done();
        });
    });

    it('should decode token payload', () => {
        const decodedPayload = service['decodeToken']<{ test: string }>(
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0ZXN0IjoiYWJjIn0.6H1FrSK81h23bQgzoITG06_6UXThXHhy6UeT6UOzr1w'
        );
        expect(decodedPayload).toEqual({ test: 'abc' });
    });

    it('should emit willExpireSoon event', fakeAsync(() => {
        const mockToken =
            'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyLCJleHAiOjE1MTYyMzkwMjJ9.tzP05SKT-8sR15XoZOIez-jKjxzHAK1gnUNgW27Zv1k';

        service['setExpiryEmitter'] = jasmine.createSpy();

        service.processNewTokens(mockToken, mockToken);

        service.willExpireSoon.subscribe(() => {
            expect(service['setExpiryEmitter']).toHaveBeenCalled();
        });

        tick(7000);

        service.willExpireSoon.subscribe(() => {
            expect(service['setExpiryEmitter']).toHaveBeenCalledTimes(2);
        });

        tick(3000);
    }));
});
