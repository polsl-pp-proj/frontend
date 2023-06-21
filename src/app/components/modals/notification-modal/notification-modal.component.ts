import { Component, Input, OnInit } from '@angular/core';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { UserOrganizationDto } from 'src/app/modules/auth/dtos/user-organization.dto';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { NotificationDto } from 'src/app/modules/notification/modules/notification-api/dtos/notification.dto';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';
import { MessageModalComponent } from '../message-modal/message-modal.component';

@Component({
    selector: 'app-notification-modal',
    templateUrl: './notification-modal.component.html',
    styleUrls: ['./notification-modal.component.scss'],
})
export class NotificationModalComponent implements OnInit {
    static ModalName = 'notification';

    get modalName() {
        return NotificationModalComponent.ModalName;
    }

    @Input()
    notif!: NotificationDto;

    userOrganizations: number[] = [];

    constructor(
        private readonly authService: AuthService,
        private readonly notifService: NotificationService,
        private readonly modalService: ModalService
    ) {}

    ngOnInit(): void {
        this.authService.authTokenPayload.subscribe((payload) => {
            this.userOrganizations =
                payload?.organizations
                    .filter((org) => org.role === OrganizationMemberRole.Owner)
                    .map((org) => org.organizationId) ?? [];
        });
    }

    get isOwner(): boolean {
        return this.userOrganizations.includes(this.notif.organization.id);
    }

    get modalTitle() {
        switch (this.notif.type) {
            case NotificationType.ProjectMessage:
                return 'Wiadomość';
            case NotificationType.OpenPositionApplication:
                return 'Aplikacja na pozycję';
            case NotificationType.MessageAnswer:
                return 'Odpowiedź';
            case NotificationType.ProjectDraftPublication:
                return 'Potwierdzenie publikacji projektu';
            case NotificationType.ProjectDraftRejection:
                return 'Odrzucenie publikacji projektu';
            default:
                return 'Powiadomienie';
        }
    }

    toggleRead() {
        if (this.notif.seen) {
            this.notifService.markNotificationAsNotSeen(this.notif);
        } else {
            this.notifService.markNotificationAsSeen(this.notif);
        }

        this.modalService.updateModalState(this.modalName, 'close');
    }

    remove() {
        this.notifService.removeNotification(this.notif);
    }

    reply() {
        this.modalService.updateModalState(
            MessageModalComponent.ModalName,
            'open'
        );
    }

    NotificationType = NotificationType;
}
