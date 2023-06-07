import { Component, Input } from '@angular/core';
import { NotificationType } from 'src/app/enums/notification-type.enum';

@Component({
    selector: 'app-notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent {
    static ModalName = 'notification';
    get modalName() {
        return NotificationModalComponent.ModalName;
    }

    @Input()
    type: NotificationType = NotificationType.ProjectDraftRejection;
    get modalTitle() {
        return this.type;
    }
}
