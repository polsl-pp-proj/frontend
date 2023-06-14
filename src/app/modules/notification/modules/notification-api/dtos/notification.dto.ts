import { NotificationType } from '../enums/notification-type.enum';

export class NotificationDto {
    id!: number;
    subject!: string;
    message!: string;
    projectId!: number;
    organizationName!: string;
    type!: NotificationType;
    seen!: boolean;
    createdAt!: number;
    updatedAt!: number;
}
