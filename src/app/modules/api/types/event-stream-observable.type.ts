import { Observable } from 'rxjs';
import * as EventSource from 'eventsource';

export type EventStreamObservable<RS> = Observable<MessageEvent<RS>> & {
    eventSource: EventSource;
    close: () => void;
};
