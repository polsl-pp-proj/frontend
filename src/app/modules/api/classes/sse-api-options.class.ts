import * as EventSource from 'eventsource';

export class SseApiOptions implements EventSource.EventSourceInitDict {
    headers?: { [key: string]: string };
    routeParams?: { [key: string]: string | number };
    addHost: boolean = true;

    constructor(options?: Partial<SseApiOptions>) {
        Object.assign(this, options);
    }
}
