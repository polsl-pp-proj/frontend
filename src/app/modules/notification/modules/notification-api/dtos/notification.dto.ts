import { NotificationType } from '../enums/notification-type.enum';

export class NotificationDto {
    id!: number;
    subject!: string;
    message!: string;
    project!: { id: number; name: string };
    organization!: { id: number; name: string };
    type!: NotificationType;
    seen!: boolean;
    createdAt!: number;
    updatedAt!: number;
}
