import { Observable } from 'rxjs';
import * as EventSource from 'eventsource';

export type EventStreamData<RS> = MessageEvent<RS> & {
    eventSource: EventSource;
};

export type EventStreamObservable<RS> = Observable<EventStreamData<RS>>;
