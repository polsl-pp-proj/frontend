import { TestBed } from '@angular/core/testing';

import { DataStorageService } from './data-storage.service';
import { DataStorageType } from '../enums/data-storage-type.enum';

describe('DataStorageService', () => {
    let service: DataStorageService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(DataStorageService);
        const mockLocalStorage = {
            store: {} as { [key: string]: any },
            getItem: (key: string): string => {
                return key in mockLocalStorage.store
                    ? mockLocalStorage.store[key]
                    : null;
            },
            setItem: (key: string, value: string) => {
                mockLocalStorage.store[key] = `${value}`;
            },
        };

        spyOn(window.localStorage, 'getItem').and.callFake(
            mockLocalStorage.getItem
        );
        spyOn(window.localStorage, 'setItem').and.callFake(
            mockLocalStorage.setItem
        );
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('get', () => {
        it('should return empty object if item not in local storage', () => {
            const result = service.get(DataStorageType.Auth);
            expect(result).toEqual({});
        });

        it('should return parsed object from local storage', () => {
            const testData = { name: 'test' };
            localStorage.setItem(
                DataStorageType.Auth,
                JSON.stringify(testData)
            );
            const result = service.get(DataStorageType.Auth);
            expect(result).toEqual(testData);
        });

        it('should catch syntax error and set empty object in local storage', () => {
            localStorage.setItem(DataStorageType.Auth, 'invalid json');
            const result = service.get(DataStorageType.Auth);
            expect(result).toEqual({});
        });
    });

    describe('set', () => {
        it('should set item in local storage', () => {
            const testData = { name: 'test' };
            service.set(DataStorageType.Auth, testData);
            const result = localStorage.getItem(DataStorageType.Auth);
            expect(result).toEqual(JSON.stringify(testData));
        });

        it('should emit event with new data', (done) => {
            const testData = { name: 'test' };
            const observable = service.dataChangeObservable(
                DataStorageType.Auth
            );
            observable.subscribe((data) => {
                expect(data).toEqual(testData);
                done();
            });
            service.set(DataStorageType.Auth, testData);
        });
    });

    describe('dataChangeObservable', () => {
        it('should return existing emitter if exists', () => {
            const testData = { name: 'test' };
            const emitter1 = service.dataChangeObservable(DataStorageType.Auth);
            const emitter2 = service.dataChangeObservable(DataStorageType.Auth);
            expect(emitter1).toEqual(emitter2);
        });

        it('should return new emitter if not exists', () => {
            const before = service['changeObservables'].has(
                DataStorageType.Auth
            );
            service.dataChangeObservable(DataStorageType.Auth);
            const after = service['changeObservables'].has(
                DataStorageType.Auth
            );
            expect(before).toBeFalse();
            expect(after).toBeTrue();
        });

        it('should emit event with current data when subscribed', (done) => {
            const testData = { name: 'test' };
            const observable = service.dataChangeObservable(
                DataStorageType.Auth
            );
            observable.subscribe((data) => {
                expect(data).toEqual(testData);
                done();
            });
            service.set(DataStorageType.Auth, testData);
        });
    });
});
