import { TestBed } from '@angular/core/testing';

import { UrlService } from './url.service';
import { environment } from 'src/environments/environment';

describe('UrlService', () => {
    let service: UrlService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(UrlService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('bindRouteParams', () => {
        it('should replace route parameters with their values', () => {
            const route = '/users/:id/posts/:postId';
            const params = { id: 1, postId: 2 };
            const boundRoute = service.bindRouteParams(route, params);
            expect(boundRoute).toEqual('users/1/posts/2');
        });

        it('should throw an error when a parameter is missing', () => {
            const route = '/users/:id/posts/:postId';
            const params = { id: 1 };
            expect(() => service.bindRouteParams(route, params)).toThrowError(
                'Parameter postId cannot be bound.'
            );
        });

        it('should return the same route when there are no parameters', () => {
            const route = '/users';
            const boundRoute = service.bindRouteParams(route);
            expect(boundRoute).toEqual('users');
        });
    });

    describe('getAPIRouteWithHost', () => {
        it('should return the correct API route with host', () => {
            const route = '/users';
            const expectedAPIRoute = `${environment.apiUrl}/users`;
            const actualAPIRoute = service.getAPIRouteWithHost(route);
            expect(actualAPIRoute).toEqual(expectedAPIRoute);
        });

        it('should remove leading slash from route', () => {
            const route = '/users';
            const expectedAPIRoute = `${environment.apiUrl}/users`;
            const actualAPIRoute = service.getAPIRouteWithHost(route);
            expect(actualAPIRoute).toEqual(expectedAPIRoute);
        });
    });

    describe('getBoundAPIRouteWithHost', () => {
        it('should return the correct bound API route with host when there are no route parameters', () => {
            const route = '/users';
            const expectedAPIRoute = `${environment.apiUrl}/users`;
            const actualAPIRoute = service.getBoundAPIRouteWithHost(route);
            expect(actualAPIRoute).toEqual(expectedAPIRoute);
        });

        it('should return the correct bound API route with host when there are route parameters', () => {
            const route = '/users/:id/posts/:postId';
            const params = { id: 1, postId: 2 };
            const expectedAPIRoute = `${environment.apiUrl}/users/1/posts/2`;
            const actualAPIRoute = service.getBoundAPIRouteWithHost(
                route,
                params
            );
            expect(actualAPIRoute).toEqual(expectedAPIRoute);
        });

        it('should return the correct API route with host when there are route parameters but no param values are passed in', () => {
            const route = '/users/:id/posts/:postId';
            const expectedAPIRoute = `${environment.apiUrl}/users/:id/posts/:postId`;
            const actualAPIRoute = service.getBoundAPIRouteWithHost(route);
            expect(actualAPIRoute).toEqual(expectedAPIRoute);
        });
    });
});
