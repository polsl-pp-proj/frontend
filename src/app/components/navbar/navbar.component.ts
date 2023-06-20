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
        private readonly authService: AuthService
    ) {}

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

    openNotifications() {
        this.showNotifications = !this.showNotifications;
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

    // getNotifSize(): string {
    //     let val = this.notifications.filter((notifica)).length.toString();
    //     if (this.notifications.length > 99) {
    //         val = '99+';
    //     }
    //     return val;
    // }

    UserRole = UserRole;
}
