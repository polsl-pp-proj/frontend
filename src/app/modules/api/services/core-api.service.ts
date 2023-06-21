import { Injectable } from '@angular/core';
import {
    HttpClient,
    HttpEvent,
    HttpEventType,
    HttpRequest,
    HttpResponse,
} from '@angular/common/http';
import {
    EventStreamApiRoute,
    GeneralApiRoute,
} from '../classes/api-route.class';
import {
    Observable,
    filter,
    map,
    mergeMap,
    skipWhile,
    take,
    timeout,
} from 'rxjs';
import { ApiOptions, ApiOptionsBody } from '../classes/api-options.class';
import {
    BodilessRequestMethod,
    BodilyRequestMethod,
} from '../types/request-method.type';
import { UrlService } from './url.service';
import { ApiAuthService } from './api-auth.service';
import * as EventSource2 from 'eventsource';
import {
    EventStreamData,
    EventStreamObservable,
} from '../types/event-stream-observable.type';
import { SseApiOptions } from '../classes/sse-api-options.class';

@Injectable({
    providedIn: 'root',
})
export class CoreApiService {
    constructor(
        private readonly httpClient: HttpClient,
        private readonly urlService: UrlService,
        private readonly apiAuthService: ApiAuthService
    ) {}

    request<RS, RQ = unknown>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilessRequestMethod;
        },
        options?: ApiOptions & { observe: 'body' }
    ): Observable<RS>;
    request<RQ, RS>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilyRequestMethod;
        },
        body?: RQ,
        options?: ApiOptions & { observe: 'body' }
    ): Observable<RS>;
    request<RS, RQ = unknown>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilessRequestMethod;
        },
        options?: ApiOptions & { observe: 'response' }
    ): Observable<HttpResponse<RS>>;
    request<RQ, RS>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilyRequestMethod;
        },
        body?: RQ,
        options?: ApiOptions & { observe: 'response' }
    ): Observable<HttpResponse<RS>>;
    request<RS, RQ = unknown>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilessRequestMethod;
        },
        options?: ApiOptions & { observe: 'events' }
    ): Observable<HttpEvent<RS>>;
    request<RQ, RS>(
        route: Omit<GeneralApiRoute, 'method'> & {
            method: BodilyRequestMethod;
        },
        body?: RQ,
        options?: ApiOptions & { observe: 'events' }
    ): Observable<HttpEvent<RS>>;
    request<RQ, RS>(
        route: GeneralApiRoute,
        bodyOrOptions?: RQ | ApiOptions,
        bodilyOptions?: ApiOptions
    ):
        | Observable<RS>
        | Observable<HttpResponse<RS>>
        | Observable<HttpEvent<RS>> {
        let httpRequest: HttpRequest<RQ>;
        let options: ApiOptions;

        switch (route.method) {
            case 'DELETE':
            case 'GET':
            case 'HEAD':
            case 'JSONP':
            case 'OPTIONS': {
                options =
                    (bodyOrOptions as ApiOptions) ??
                    (new ApiOptions() as ApiOptionsBody);
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
                options =
                    bodilyOptions! ?? (new ApiOptions() as ApiOptionsBody);
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
                    (bodyOrOptions as RQ) ?? ({} as RQ),
                    options
                );
                break;
            }
        }

        if (route.authorized && !httpRequest.headers.has('Authorization')) {
            return this.apiAuthService.token.pipe(
                skipWhile((token) => !token),
                timeout({ each: 10000 }),
                take(1),
                mergeMap((token) => {
                    httpRequest = httpRequest.clone({
                        headers: httpRequest.headers.append(
                            'Authorization',
                            `Bearer ${token}`
                        ),
                    });

                    return this.makeRequest<RS, RQ>(options, httpRequest);
                })
            ) as
                | Observable<RS>
                | Observable<HttpResponse<RS>>
                | Observable<HttpEvent<RS>>;
        } else {
            return this.makeRequest<RS, RQ>(options, httpRequest);
        }
    }

    private makeRequest<RS, RQ>(
        {
            observe,
        }: {
            observe: 'body' | 'response' | 'events';
        },
        httpRequest: HttpRequest<RQ>
    ):
        | Observable<HttpEvent<RS>>
        | Observable<HttpResponse<RS>>
        | Observable<RS> {
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

    requestEventStream(
        route: EventStreamApiRoute,
        options: SseApiOptions,
        eventNames: string[] = []
    ): EventStreamObservable<string> {
        if (route.authorized && !options.headers?.['Authorization']) {
            return this.apiAuthService.token.pipe(
                skipWhile((token) => !token),
                timeout({ each: 10000 }),
                take(1),
                mergeMap((token) => {
                    if (options.headers) {
                        options.headers['Authorization'] = `Bearer ${token}`;
                    } else {
                        options.headers = { Authorization: `Bearer ${token}` };
                    }

                    return this.makeEventStreamRequest(
                        route,
                        options,
                        eventNames
                    );
                })
            );
        } else {
            return this.makeEventStreamRequest(route, options, eventNames);
        }
    }

    private makeEventStreamRequest(
        route: EventStreamApiRoute,
        options: SseApiOptions,
        eventNames: string[] = []
    ): EventStreamObservable<string> {
        const eventSource = new EventSource2(
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

        return new Observable<EventStreamData<string>>((subscriber) => {
            const messageHandler = (event: MessageEvent<string>) => {
                subscriber.next({
                    ...event,
                    eventSource,
                } as EventStreamData<string>);
            };
            eventSource.onmessage = messageHandler;
            eventNames.forEach((eventName) =>
                eventSource.addEventListener(eventName, messageHandler)
            );
            eventSource.onerror = (event) => {
                subscriber.error(event);
            };
        });
    }
}
