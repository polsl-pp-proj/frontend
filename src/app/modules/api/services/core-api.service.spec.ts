import { TestBed } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController,
} from '@angular/common/http/testing';
import { CoreApiService } from './core-api.service';
import { ApiRoute } from '../classes/api-route.class';
import {
    ApiOptions,
    ApiOptionsBody,
    ApiOptionsResponse,
} from '../classes/api-options.class';
import { environment } from 'src/environments/environment';

describe('CoreApiService', () => {
    let service: CoreApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CoreApiService],
        });

        service = TestBed.inject(CoreApiService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('request', () => {
        it('should send a GET request and return response body', () => {
            const expectedResponse = { message: 'Hello, world!' };
            const route: ApiRoute = {
                authorized: false,
                method: 'GET',
                path: '/test',
            };
            const options = new ApiOptions({
                observe: 'body',
            }) as ApiOptionsBody;

            service.request<any>(route, options).subscribe((response) => {
                expect(response).toEqual(expectedResponse);
            });

            const httpRequest = httpMock.expectOne(
                `${environment.apiUrl}/test`
            );
            expect(httpRequest.request.method).toBe('GET');
            httpRequest.flush(expectedResponse);
        });

        it('should send a POST request with a body and return response body', () => {
            const expectedResponse = { message: 'Success!' };
            const route: ApiRoute = {
                method: 'POST',
                path: '/test',
                authorized: false,
            };
            const body = { username: 'testuser', password: 'testpassword' };
            const options = new ApiOptions({
                observe: 'body',
            }) as ApiOptionsBody;

            service
                .request<any, any>(route, body, options)
                .subscribe((response) => {
                    expect(response).toEqual(expectedResponse);
                });

            const httpRequest = httpMock.expectOne(
                `${environment.apiUrl}/test`
            );
            expect(httpRequest.request.method).toBe('POST');
            expect(httpRequest.request.body).toEqual(body);
            httpRequest.flush(expectedResponse);
        });

        it('should send a PUT request with a body and return response body', () => {
            const expectedResponse = { message: 'Success!' };
            const route: ApiRoute = {
                method: 'PUT',
                path: '/test',
                authorized: false,
            };
            const body = { username: 'testuser', password: 'testpassword' };
            const options = new ApiOptions({
                observe: 'body',
            }) as ApiOptionsBody;

            service
                .request<any, any>(route, body, options)
                .subscribe((response) => {
                    expect(response).toEqual(expectedResponse);
                });

            const httpRequest = httpMock.expectOne(
                `${environment.apiUrl}/test`
            );
            expect(httpRequest.request.method).toBe('PUT');
            expect(httpRequest.request.body).toEqual(body);
            httpRequest.flush(expectedResponse);
        });

        it('should send a DELETE request and return response body', () => {
            const expectedResponse = { message: 'Success!' };
            const route: ApiRoute = {
                method: 'DELETE',
                path: '/test',
                authorized: false,
            };
            const options = new ApiOptions({
                observe: 'body',
            }) as ApiOptionsBody;

            service.request<any>(route, options).subscribe((response) => {
                expect(response).toEqual(expectedResponse);
            });

            const httpRequest = httpMock.expectOne(
                `${environment.apiUrl}/test`
            );
            expect(httpRequest.request.method).toBe('DELETE');
            httpRequest.flush(expectedResponse);
        });

        it('should send a GET request and return a response object', () => {
            const route: ApiRoute = {
                method: 'GET',
                path: '/api/data',
                authorized: true,
            };

            const options = new ApiOptions({
                observe: 'response',
            }) as ApiOptionsResponse;

            const expectedResponse = {
                data: 'test data',
            };

            service.request<any>(route, options).subscribe((response) => {
                expect(response.body).toEqual(expectedResponse);
            });

            const request = httpMock.expectOne(
                `${environment.apiUrl}${route.path}`
            );
            expect(request.request.method).toBe('GET');
            expect(request.request.headers.has('Authorization')).toBeTrue();
            request.flush(expectedResponse);
        });

        it('should send a POST request with body and return a response object', () => {
            const route: ApiRoute = {
                method: 'POST',
                path: '/api/data',
                authorized: true,
            };

            const requestBody = { name: 'Test', value: 123 };

            const options = new ApiOptions({
                observe: 'response',
            }) as ApiOptionsResponse;

            const expectedResponse = {
                data: 'test data',
            };

            service
                .request<typeof requestBody, any>(route, requestBody, options)
                .subscribe((response) => {
                    expect(response.body).toEqual(expectedResponse);
                });

            const request = httpMock.expectOne(
                `${environment.apiUrl}${route.path}`
            );
            expect(request.request.method).toBe('POST');
            expect(request.request.headers.has('Authorization')).toBeTrue();
            expect(request.request.body).toEqual(requestBody);
            request.flush(expectedResponse);
        });

        it('should send a PUT request with body and return a response object', () => {
            const route: ApiRoute = {
                method: 'PUT',
                path: '/api/data',
                authorized: true,
            };

            const requestBody = { name: 'Test', value: 123 };

            const options = new ApiOptions({
                observe: 'response',
            }) as ApiOptionsResponse;

            const expectedResponse = {
                data: 'test data',
            };

            service
                .request<typeof requestBody, any>(route, requestBody, options)
                .subscribe((response) => {
                    expect(response.body).toEqual(expectedResponse);
                });

            const request = httpMock.expectOne(
                `${environment.apiUrl}${route.path}`
            );
            expect(request.request.method).toBe('PUT');
            expect(request.request.headers.has('Authorization')).toBeTrue();
            expect(request.request.body).toEqual(requestBody);
            request.flush(expectedResponse);
        });
    });
});
