import { EventEmitter, Injectable } from '@angular/core';
import { NotificationDto } from '../modules/notification-api/dtos/notification.dto';
import { NotificationApiService } from '../modules/notification-api/services/notification-api.service';
import { NotificationEventType } from '../enums/notification-event-type.enum';
import { EventStreamData } from '../../api/types/event-stream-observable.type';
import {
    BehaviorSubject,
    Subscription,
    mergeMap,
    of,
    skipWhile,
    tap,
    throwError,
} from 'rxjs';
import * as EventSource from 'eventsource';
import { NotificationReceiver } from '../types/notification-receiver.type';
import { NotificationType } from '../modules/notification-api/enums/notification-type.enum';
import { AuthService } from '../../auth/services/auth.service';

const notificationsPerPage = 5;

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private authenticatedSubscription!: Subscription;
    private notificationEventsSubscription!: Subscription;
    //        notification identifier, notification
    private notifications: Map<string, NotificationDto> = new Map();

    private eventSource!: EventSource;
    private notificationsChanged = new EventEmitter<boolean>(); // true = have to go to first page, false = don't have to go to first page
    private pageCount = new BehaviorSubject<number>(1);

    get notificationsChangedObservable() {
        return this.notificationsChanged.asObservable();
    }
    get pageCountChangedObservable() {
        return this.pageCount.asObservable();
    }

    constructor(
        private readonly notificationApiService: NotificationApiService,
        private readonly authService: AuthService
    ) {}

    getNotifications(page = 1) {
        if (this.notifications.size > (page - 1) * notificationsPerPage) {
            return of(this.getNotificationsSlice(page, notificationsPerPage));
        } else if (page <= this.pageCount.value) {
            return this.fetchNotifications().pipe(
                mergeMap(() =>
                    of(this.getNotificationsSlice(page, notificationsPerPage))
                )
            );
        } else {
            return throwError(() => new Error('page_over_page_count'));
        }
    }

    fetchNotifications(page = 1) {
        return this.notificationApiService
            .getNotifications({ elementsPerPage: notificationsPerPage, page })
            .pipe(
                tap({
                    next: (notificationsDto) => {
                        this.pageCount.next(notificationsDto.pageCount);
                        notificationsDto.notifications.forEach((notification) =>
                            this.notifications.set(
                                this.notificationIdentifierByReceiverAndId(
                                    this.notificationReceiverByNotificationType(
                                        notification.type
                                    ),
                                    notification.id
                                ),
                                notification
                            )
                        );
                    },
                })
            );
    }

    markNotificationAsSeen(notificationDto: NotificationDto) {
        if (
            this.notificationReceiverByNotificationType(
                notificationDto.type
            ) === 'org'
        ) {
            this.notificationApiService
                .markOrganizationNotificationAsSeen(
                    notificationDto.organization.id,
                    notificationDto.id
                )
                .subscribe();
        } else {
            this.notificationApiService
                .markUserNotificationAsSeen(notificationDto.id)
                .subscribe();
        }
    }

    markNotificationAsNotSeen(notificationDto: NotificationDto) {
        if (
            this.notificationReceiverByNotificationType(
                notificationDto.type
            ) === 'org'
        ) {
            this.notificationApiService
                .markOrganizationNotificationAsNotSeen(
                    notificationDto.organization.id,
                    notificationDto.id
                )
                .subscribe();
        } else {
            this.notificationApiService
                .markUserNotificationAsNotSeen(notificationDto.id)
                .subscribe();
        }
    }

    removeNotification(notificationDto: NotificationDto) {
        if (
            this.notificationReceiverByNotificationType(
                notificationDto.type
            ) === 'org'
        ) {
            this.notificationApiService
                .removeOrganizationNotification(
                    notificationDto.organization.id,
                    notificationDto.id
                )
                .subscribe();
        } else {
            this.notificationApiService
                .removeUserNotification(notificationDto.id)
                .subscribe();
        }
    }

    // TO BE CALLED ON NOTIFICATION HUB INIT
    init() {
        this.subscribeNotificationEvents();
    }

    destroy() {
        this.unsubscribeNotificationEvents();
        this.authenticatedSubscription.unsubscribe();
    }

    private getNotificationsSlice(page: number, pageSize: number) {
        const notifications: NotificationDto[] = Object.values(
            this.notifications
        );
        return notifications
            .sort((a, b) => a.createdAt - b.createdAt)
            .slice((page - 1) * pageSize, page * pageSize);
    }

    private setNotificationEventSubscriptionUp() {
        this.notificationEventsSubscription = this.notificationApiService
            .getNotificationEventObservable()
            .subscribe((event) => {
                const eventType = event.type as NotificationEventType;
                this.eventSource = event.eventSource;
                switch (eventType) {
                    case NotificationEventType.CloseConnection: {
                        this.handleCloseConnection(
                            event as unknown as MessageEvent<string> & {
                                eventSource: EventSource;
                            }
                        );
                        break;
                    }
                    case NotificationEventType.NotificationCreated: {
                        this.handleNotificationCreated(
                            event as EventStreamData<
                                NotificationDto & {
                                    receiver: NotificationReceiver;
                                }
                            >
                        );
                        break;
                    }
                    case NotificationEventType.NotificationSeen: {
                        this.handleNotificationSeen(event);
                        break;
                    }
                    case NotificationEventType.NotificationNotSeen: {
                        this.handleNotificationNotSeen(event);
                        break;
                    }
                    case NotificationEventType.NotificationRemoved: {
                        this.handleNotificationRemoved(event);
                        break;
                    }
                }
            });
    }

    private subscribeNotificationEvents() {
        this.authenticatedSubscription = this.authService.authenticated
            .pipe(skipWhile((auth) => auth === undefined))
            .subscribe((auth) => {
                if (auth) {
                    this.setNotificationEventSubscriptionUp();
                    return;
                }
                this.unsubscribeNotificationEvents();
                this.notifications.clear();
            });
    }

    private unsubscribeNotificationEvents(eventSource = this.eventSource) {
        eventSource?.close();
        this.notificationEventsSubscription?.unsubscribe();
    }

    /* Notification Event Handlers */

    private handleCloseConnection(
        event: MessageEvent<string> & {
            eventSource: EventSource;
        }
    ) {
        this.unsubscribeNotificationEvents(event.eventSource);

        if (event.data === 'reconnect') {
            this.subscribeNotificationEvents();
        }
    }

    private handleNotificationCreated(
        event: EventStreamData<
            NotificationDto & { receiver: NotificationReceiver }
        >
    ) {
        this.notifications.set(
            this.notificationIdentifierByReceiverAndId(
                event.data.receiver,
                event.data.id
            ),
            event.data
        );

        if (
            this.notifications.size >
            this.pageCount.value * notificationsPerPage
        ) {
            this.pageCount.next(this.pageCount.value + 1);
        }
        this.notificationsChanged.emit(true);
    }

    private handleNotificationSeen(
        event: EventStreamData<{ id: number; receiver: NotificationReceiver }>
    ) {
        const notification = this.notifications.get(
            this.notificationIdentifierByReceiverAndId(
                event.data.receiver,
                event.data.id
            )
        );

        if (notification) {
            notification.seen = true;
            this.notificationsChanged.emit(false);
        }
    }

    private handleNotificationNotSeen(
        event: EventStreamData<{ id: number; receiver: NotificationReceiver }>
    ) {
        const notification = this.notifications.get(
            this.notificationIdentifierByReceiverAndId(
                event.data.receiver,
                event.data.id
            )
        );

        if (notification) {
            notification.seen = false;
            this.notificationsChanged.emit(false);
        }
    }

    private handleNotificationRemoved(
        event: EventStreamData<{ id: number; receiver: NotificationReceiver }>
    ) {
        if (
            this.notifications.delete(
                this.notificationIdentifierByReceiverAndId(
                    event.data.receiver,
                    event.data.id
                )
            )
        ) {
            if (
                this.notifications.size <
                    this.pageCount.value * notificationsPerPage &&
                this.notifications.size >=
                    (this.pageCount.value - 1) * notificationsPerPage
            ) {
                this.pageCount.next(this.pageCount.value - 1);
            }

            this.notificationsChanged.emit(true);
        }
    }

    private notificationReceiverByNotificationType(
        notificationType: NotificationType
    ): NotificationReceiver {
        switch (notificationType) {
            case NotificationType.MessageAnswer: {
                return 'usr';
            }
            case NotificationType.OpenPositionApplication:
            case NotificationType.ProjectDraftPublication:
            case NotificationType.ProjectDraftRejection:
            case NotificationType.ProjectMessage: {
                return 'org';
            }
        }
    }

    private notificationIdentifierByReceiverAndId(
        receiver: NotificationReceiver,
        notificationId: number
    ) {
        return `${receiver}:${notificationId}`;
    }
}
