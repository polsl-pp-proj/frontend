import { EventEmitter, Injectable } from '@angular/core';
import { NotificationDto } from '../modules/notification-api/dtos/notification.dto';
import { NotificationApiService } from '../modules/notification-api/services/notification-api.service';
import { NotificationEventType } from '../enums/notification-event-type.enum';
import { EventStreamData } from '../../api/types/event-stream-observable.type';
import { Subscription, mergeMap, of, tap } from 'rxjs';
import * as EventSource from 'eventsource';
import { NotificationReceiver } from '../types/notification-receiver.type';
import { NotificationType } from '../modules/notification-api/enums/notification-type.enum';

const notificationsPerPage = 5;

@Injectable({
    providedIn: 'root',
})
export class NotificationService {
    private notificationEventsSubscription!: Subscription;
    //        notification identifier, notification
    private notifications: Map<string, NotificationDto> = new Map();
    private pageCount = 1;

    private eventSource!: EventSource;
    private notificationsChanged = new EventEmitter<void>();

    constructor(
        private readonly notificationApiService: NotificationApiService
    ) {}

    getNotifications(page = 1) {
        if (this.notifications.size > (page - 1) * notificationsPerPage) {
            return of(this.getNotificationsSlice(page, notificationsPerPage));
        } else {
            return this.fetchNotifications().pipe(
                mergeMap(() =>
                    of(this.getNotificationsSlice(page, notificationsPerPage))
                )
            );
        }
    }

    fetchNotifications(page = 1) {
        return this.notificationApiService
            .getNotifications({ elementsPerPage: notificationsPerPage, page })
            .pipe(
                tap({
                    next: (notificationsDto) => {
                        this.pageCount = notificationsDto.pageCount;
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

    private getNotificationsSlice(page: number, pageSize: number) {
        const notifications: NotificationDto[] = Object.values(
            this.notifications
        );
        return notifications
            .sort((a, b) => a.createdAt - b.createdAt)
            .slice((page - 1) * pageSize, page * pageSize);
    }

    private subscribeNotificationEvents() {
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

        if (this.notifications.size > this.pageCount * notificationsPerPage) {
            ++this.pageCount;
        }
        this.notificationsChanged.emit();
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
            this.notificationsChanged.emit();
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
            this.notificationsChanged.emit();
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
                    this.pageCount * notificationsPerPage &&
                this.notifications.size >=
                    (this.pageCount - 1) * notificationsPerPage
            ) {
                --this.pageCount;
            }

            this.notificationsChanged.emit();
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
