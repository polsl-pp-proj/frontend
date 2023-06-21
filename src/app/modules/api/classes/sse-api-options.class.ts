import * as EventSource2 from 'eventsource';

export class SseApiOptions implements EventSource2.EventSourceInitDict {
    headers?: { [key: string]: string };
    routeParams?: { [key: string]: string | number };
    addHost: boolean = true;

    constructor(options?: Partial<SseApiOptions>) {
        Object.assign(this, options);
    }
}
