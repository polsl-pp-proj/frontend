import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';

export class ApiOptions {
    headers?: HttpHeaders;
    context?: HttpContext;
    reportProgress?: boolean;
    params?: HttpParams;
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text';
    withCredentials?: boolean;
    observe: 'body' | 'events' | 'response' = 'body';
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
