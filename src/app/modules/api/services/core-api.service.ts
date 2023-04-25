import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import { GeneralApiRoute } from '../classes/api-route.class';
import { Observable, filter, map } from 'rxjs';
import { ApiOptions } from '../classes/api-options.class';
import {
    BodilessRequestMethod,
    BodilyRequestMethod,
} from '../types/request-method.type';

@Injectable({
    providedIn: 'root',
})
export class CoreApiService {
    constructor(private readonly httpClient: HttpClient) {}

    request<RS, RQ = unknown>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilessRequestMethod;
        },
        options: ApiOptions & { observe: 'body' }
    ): Observable<RS>;
    request<RQ, RS>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilyRequestMethod;
        },
        body: RQ,
        options: ApiOptions & { observe: 'body' }
    ): Observable<RS>;
    request<RS, RQ = unknown>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilessRequestMethod;
        },
        options: ApiOptions & { observe: 'response' }
    ): Observable<HttpResponse<RS>>;
    request<RQ, RS>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilyRequestMethod;
        },
        body: RQ,
        options: ApiOptions & { observe: 'response' }
    ): Observable<HttpResponse<RS>>;
    request<RS, RQ = unknown>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilessRequestMethod;
        },
        options: ApiOptions & { observe: 'events' }
    ): Observable<HttpEvent<RS>>;
    request<RQ, RS>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilyRequestMethod;
        },
        body: RQ,
        options: ApiOptions & { observe: 'events' }
    ): Observable<HttpEvent<RS>>;
    request<RQ, RS>(
        route: GeneralApiRoute,
        bodyOrOptions: RQ | ApiOptions,
        bodilyOptions?: ApiOptions
    ):
        | Observable<RS>
        | Observable<HttpResponse<RS>>
        | Observable<HttpEvent<RS>> {
        const authToken = ''; // TODO: get auth token from AuthService

        let httpRequest: HttpRequest<RQ>;
        let observe: 'body' | 'events' | 'response';

        switch (route.method) {
            case 'DELETE':
            case 'GET':
            case 'HEAD':
            case 'JSONP':
            case 'OPTIONS': {
                httpRequest = new HttpRequest(
                    route.method,
                    route.path,
                    bodyOrOptions as ApiOptions
                );
                observe = (bodyOrOptions as ApiOptions).observe;
                break;
            }
            case 'PATCH':
            case 'POST':
            case 'PUT': {
                httpRequest = new HttpRequest<RQ>(
                    route.method,
                    route.path,
                    bodyOrOptions as RQ,
                    bodilyOptions
                );
                observe = bodilyOptions!.observe;
                break;
            }
        }

        if (route.authorized && !httpRequest.headers.has('Authorization')) {
            httpRequest = httpRequest.clone({
                headers: httpRequest.headers.append(
                    'Authorization',
                    `Bearer ${authToken}`
                ),
            });
        }

        if (observe === 'body') {
            return this.httpClient.request<RS>(httpRequest).pipe(
                filter((httpEvent: HttpEvent<RS>) => {
                    return httpEvent.type === HttpEventType.Response;
                }),
                map((httpEvent: HttpEvent<RS>) => {
                    return (httpEvent as HttpResponse<RS>).body;
                })
            ) as Observable<RS>;
        } else if (observe === 'response') {
            return this.httpClient.request<RS>(httpRequest).pipe(
                filter((httpEvent: HttpEvent<RS>) => {
                    return httpEvent.type === HttpEventType.Response;
                }),
                map((httpEvent: HttpEvent<RS>) => {
                    return httpEvent as HttpResponse<RS>;
                })
            ) as Observable<HttpResponse<RS>>;
        } else {
            return this.httpClient.request<RS>(httpRequest);
        }
    }
}
