import { ApiRoute } from 'src/app/modules/api/classes/api-route.class';

export const notificationApiRoutes = {
    SSE_notificationEvents: {
        authorized: true,
        method: 'EVENT',
        path: 'v1/notification/events',
    },
    GET_notifications: {
        authorized: true,
        method: 'GET',
        path: 'v1/notification',
    },
    POST_answerOrganizationNotificationToUser: {
        authorized: true,
        method: 'POST',
        path: 'v1/notification/user/organization/:organizationId/:notificationId',
    },
    PATCH_markOrganizationNotificationAsSeen: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/notification/organization/:organizationId/:notificationId/mark-seen',
    },
    PATCH_markOrganizationNotificationAsNotSeen: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/notification/organization/:organizationId/:notificationId/mark-not-seen',
    },
    DELETE_removeOrganizationNotification: {
        authorized: true,
        method: 'DELETE',
        path: 'v1/notification/organization/:organizationId/:notificationId',
    },
    PATCH_markUserNotificationAsSeen: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/notification/user/:notificationId/mark-seen',
    },
    PATCH_markUserNotificationAsNotSeen: {
        authorized: true,
        method: 'PATCH',
        path: 'v1/notification/user/:notificationId/mark-not-seen',
    },
    DELETE_removeUserNotification: {
        authorized: true,
        method: 'DELETE',
        path: 'v1/notification/user/:notificationId',
    },
} satisfies { [key: string]: ApiRoute };
