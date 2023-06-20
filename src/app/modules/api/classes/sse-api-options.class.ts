import { HttpHeaders, HttpParams } from '@angular/common/http';
import * as EventSource from 'eventsource';

export class SseApiOptions implements EventSource.EventSourceInitDict {
    headers?: HttpHeaders;
    routeParams?: { [key: string]: string | number };
    addHost: boolean = true;

    constructor(options?: Partial<SseApiOptions>) {
        Object.assign(this, options);
    }
}
