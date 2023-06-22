export class NotificationAnswerDto {
    message!: string;

    constructor(notificationAnswerDto: NotificationAnswerDto) {
        Object.assign(this, notificationAnswerDto);
    }
}
