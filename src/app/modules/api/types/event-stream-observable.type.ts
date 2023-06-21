import { Observable } from 'rxjs';
import * as EventSource2 from 'eventsource';

export type EventStreamData<RS> = MessageEvent<RS> & {
    eventSource: EventSource2;
};

export type EventStreamObservable<RS> = Observable<EventStreamData<RS>>;
