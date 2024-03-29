import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { notificationApiRoutes } from '../notification-api.routes';
import { SseApiOptions } from 'src/app/modules/api/classes/sse-api-options.class';
import { NotificationDto } from '../dtos/notification.dto';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { HttpParams } from '@angular/common/http';
import { PaginationDto } from 'src/app/dtos/pagination.dto';
import { NotificationsDto } from '../dtos/notifications.dto';
import { NotificationReceiver } from '../../../types/notification-receiver.type';
import { NotificationEventType } from '../../../enums/notification-event-type.enum';
import { NotificationAnswerDto } from '../dtos/notification-answer.dto';

@Injectable({
    providedIn: 'root',
})
export class NotificationApiService {
    constructor(private readonly apiService: CoreApiService) {}

    getNotificationEventObservable() {
        return this.apiService.requestEventStream(
            notificationApiRoutes.SSE_notificationEvents,
            new SseApiOptions(),
            [
                'close_connection',
                'notification:created',
                'notification:seen',
                'notification:not-seen',
                'notification:removed',
            ]
        );
    }

    getNotifications(paginationData: PaginationDto = new PaginationDto({})) {
        return this.apiService.request<NotificationsDto>(
            notificationApiRoutes.GET_notifications,
            new ApiOptions({
                params: new HttpParams({ fromObject: { ...paginationData } }),
            }) as ApiOptionsBody
        );
    }

    answerOrganizationNotificationToUser(
        organizationId: number,
        notificationId: number,
        answerMessage: string
    ) {
        return this.apiService.request<NotificationAnswerDto, void>(
            notificationApiRoutes.POST_answerOrganizationNotificationToUser,
            new NotificationAnswerDto({ message: answerMessage }),
            new ApiOptions({
                routeParams: { organizationId, notificationId },
            }) as ApiOptionsBody
        );
    }

    markOrganizationNotificationAsSeen(
        organizationId: number,
        notificationId: number
    ) {
        return this.apiService.request<any, void>(
            notificationApiRoutes.PATCH_markOrganizationNotificationAsSeen,
            {},
            new ApiOptions({
                routeParams: { organizationId, notificationId },
            }) as ApiOptionsBody
        );
    }

    markOrganizationNotificationAsNotSeen(
        organizationId: number,
        notificationId: number
    ) {
        return this.apiService.request<any, void>(
            notificationApiRoutes.PATCH_markOrganizationNotificationAsNotSeen,
            {},
            new ApiOptions({
                routeParams: { organizationId, notificationId },
            }) as ApiOptionsBody
        );
    }

    removeOrganizationNotification(
        organizationId: number,
        notificationId: number
    ) {
        return this.apiService.request<void>(
            notificationApiRoutes.DELETE_removeOrganizationNotification,
            new ApiOptions({
                routeParams: { organizationId, notificationId },
            }) as ApiOptionsBody
        );
    }

    markUserNotificationAsSeen(notificationId: number) {
        return this.apiService.request<any, void>(
            notificationApiRoutes.PATCH_markUserNotificationAsSeen,
            {},
            new ApiOptions({
                routeParams: { notificationId },
            }) as ApiOptionsBody
        );
    }

    markUserNotificationAsNotSeen(notificationId: number) {
        return this.apiService.request<any, void>(
            notificationApiRoutes.PATCH_markUserNotificationAsNotSeen,
            {},
            new ApiOptions({
                routeParams: { notificationId },
            }) as ApiOptionsBody
        );
    }

    removeUserNotification(notificationId: number) {
        return this.apiService.request<void>(
            notificationApiRoutes.DELETE_removeUserNotification,
            new ApiOptions({
                routeParams: { notificationId },
            }) as ApiOptionsBody
        );
    }
}
