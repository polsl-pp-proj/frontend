import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export class ApiOptions {
    headers?: HttpHeaders;
    context?: HttpContext;
    reportProgress?: boolean;
    params?: HttpParams;
    routeParams?: { [key: string]: string | number };
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    addHost: boolean = true;
    observe: 'body' | 'events' | 'response' = 'body';

    constructor(options?: Partial<ApiOptions>) {
        Object.assign(this, options);
    }
}

export type ApiOptionsBody = ApiOptions & {
    observe: 'body';
};
export type ApiOptionsEvents = ApiOptions & {
    observe: 'events';
};
export type ApiOptionsResponse = ApiOptions & {
    observe: 'response';
};
