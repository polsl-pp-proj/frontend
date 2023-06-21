import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription, skipWhile } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { LoginModalComponent } from '../modals/login-modal/login-modal.component';
import { CreateOrganizationModalComponent } from '../modals/create-organization-modal/create-organization-modal.component';
import { UserRole } from 'src/app/modules/auth/enums/user-role.enum';
import { NotificationDto } from 'src/app/modules/notification/modules/notification-api/dtos/notification.dto';
import { NotificationType } from 'src/app/enums/notification-type.enum';
import { NotificationService } from 'src/app/modules/notification/services/notification.service';
import { NotificationModalComponent } from '../modals/notification-modal/notification-modal.component';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    burgerIcon!: SafeHtml;
    xIcon!: SafeHtml;
    notifIcon!: SafeHtml;

    notifMemberIcon!: SafeHtml;
    notifArrowIcon!: SafeHtml;
    notifCheckIcon!: SafeHtml;
    notifXIcon!: SafeHtml;
    notifEnvelopeIcon!: SafeHtml;

    logged: boolean = false;
    isVerifiedStudent: boolean = false;
    userRole: UserRole = UserRole.BasicUser;

    expandedLeftMenu: boolean = false;
    expandedRightMenu: boolean = false;
    showNotifications: boolean = false;

    initials: string = '';

    authPayloadSubscription!: Subscription;

    notifications: NotificationDto[] = [];

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly modalService: ModalService,
        private readonly authService: AuthService,
        private readonly notificationService: NotificationService
    ) {
    }

    ngOnInit(): void {
        this.iconVaultService
            .getIcon('ion_menu')
            .subscribe((icon: SafeHtml | null) => {
                this.burgerIcon = icon!;
            });
        this.iconVaultService
            .getIcon('ion_x')
            .subscribe((icon: SafeHtml | null) => {
                this.xIcon = icon!;
            });
        this.iconVaultService
            .getIcon('ion_notif')
            .subscribe((icon: SafeHtml | null) => {
                this.notifIcon = icon!;
            });

        this.iconVaultService
            .getIcon('notif-member-icon')
            .subscribe((icon: SafeHtml | null) => {
                this.notifMemberIcon = icon!;
            });
        this.iconVaultService
            .getIcon('notif-arrow-icon')
            .subscribe((icon: SafeHtml | null) => {
                this.notifArrowIcon = icon!;
            });
        this.iconVaultService
            .getIcon('notif-check-icon')
            .subscribe((icon: SafeHtml | null) => {
                this.notifCheckIcon = icon!;
            });
        this.iconVaultService
            .getIcon('notif-x-icon')
            .subscribe((icon: SafeHtml | null) => {
                this.notifXIcon = icon!;
            });
        this.iconVaultService
            .getIcon('notif-envelope-icon')
            .subscribe((icon: SafeHtml | null) => {
                this.notifEnvelopeIcon = icon!;
            });

        this.authPayloadSubscription = this.authService.authTokenPayload
            .pipe(skipWhile((payload) => payload === undefined))
            .subscribe((payload) => {
                if (payload) {
                    this.logged = true;
                    this.isVerifiedStudent = payload.isVerifiedStudent;
                    this.initials = payload.firstName[0] + payload.lastName[0];
                    this.userRole = payload.role;
                    return;
                }
                this.logged = false;
            });

        this.notificationService
            .getNotifications()
            .subscribe((notifs: NotificationDto[]) => {
                this.notifications = notifs;
            });
    }
    ngOnDestroy(): void {
        this.authPayloadSubscription.unsubscribe();
    }

    openLogin() {
        this.modalService.updateModalState(
            LoginModalComponent.ModalName,
            'open'
        );
    }

    openCreateOrganization() {
        this.modalService.updateModalState(
            CreateOrganizationModalComponent.ModalName,
            'open'
        );
    }

    logout() {
        this.authService.logout().subscribe();
    }

    mapNotificationTypeToIcon(type: NotificationType): SafeHtml {
        if (type === NotificationType.ProjectMessage) {
            return this.notifEnvelopeIcon;
        } else if (type === NotificationType.MessageAnswer) {
            return this.notifArrowIcon;
        } else if (type === NotificationType.OpenPositionApplication) {
            return this.notifMemberIcon;
        } else if (type === NotificationType.ProjectDraftRejection) {
            return this.notifXIcon;
        } else {
            return this.notifCheckIcon;
        }
    }

    getNotifSize(): string {
        let val = this.notifications.length.toString();
        if (this.notifications.length > 99) {
            val = '99+';
        }
        return val;
    }

    currentNotif: NotificationDto = {
        id: -1,
        subject: 'Trwa ładowanie...',
        message: 'Trwa ładowanie...',
        project: {
            id: -1,
            name: 'Trwa ładowanie...',
        },
        organization: {
            id: -1,
            name: 'Trwa ładowanie...',
        },
        type: NotificationType.OpenPositionApplication,
        seen: false,
        createdAt: -1,
        updatedAt: -1,
    };

    openNotification(notif: NotificationDto) {
        console.log(notif);
        this.currentNotif = notif;
        this.modalService.updateModalState(
            NotificationModalComponent.ModalName,
            'open'
        );
    }

    UserRole = UserRole;
}
