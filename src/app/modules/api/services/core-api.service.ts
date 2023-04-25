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
import { UrlService } from './url.service';

@Injectable({
    providedIn: 'root',
})
export class CoreApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly urlService: UrlService
    ) {}

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
        let options: ApiOptions;

        switch (route.method) {
            case 'DELETE':
            case 'GET':
            case 'HEAD':
            case 'JSONP':
            case 'OPTIONS': {
                options = bodyOrOptions as ApiOptions;
                httpRequest = new HttpRequest(
                    route.method,
                    options.addHost
                        ? this.urlService.getBoundAPIRouteWithHost(
                              route.path,
                              options.routeParams
                          )
                        : this.urlService.bindRouteParams(
                              route.path,
                              options.routeParams
                          ),
                    options
                );
                break;
            }
            case 'PATCH':
            case 'POST':
            case 'PUT': {
                options = bodilyOptions!;
                httpRequest = new HttpRequest<RQ>(
                    route.method,
                    options.addHost
                        ? this.urlService.getBoundAPIRouteWithHost(
                              route.path,
                              options.routeParams
                          )
                        : this.urlService.bindRouteParams(
                              route.path,
                              options.routeParams
                          ),
                    bodyOrOptions as RQ,
                    options
                );
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

        if (options.observe === 'body') {
            return this.httpClient.request<RS>(httpRequest).pipe(
                filter((httpEvent: HttpEvent<RS>) => {
                    return httpEvent.type === HttpEventType.Response;
                }),
                map((httpEvent: HttpEvent<RS>) => {
                    return (httpEvent as HttpResponse<RS>).body;
                })
            ) as Observable<RS>;
        } else if (options.observe === 'response') {
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
