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

    backIcon!: SafeHtml;
    forwardIcon!: SafeHtml;

    logged: boolean = false;
    isVerifiedStudent: boolean = false;
    userRole: UserRole = UserRole.BasicUser;

    expandedLeftMenu: boolean = false;
    expandedRightMenu: boolean = false;
    showNotifications: boolean = false;

    initials: string = '';

    subsink: Subscription[] = [];

    notifications: NotificationDto[] = [];

    notificationPage = 1;
    notificationPageCount = 1;

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly modalService: ModalService,
        private readonly authService: AuthService,
        private readonly notificationService: NotificationService
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
        this.iconVaultService
            .getIcon('ion_chevron-forward')
            .subscribe((icon: SafeHtml | null) => {
                this.forwardIcon = icon!;
            });
        this.iconVaultService
            .getIcon('ion_chevron-back')
            .subscribe((icon: SafeHtml | null) => {
                this.backIcon = icon!;
            });

        this.subsink.push(
            this.authService.authTokenPayload
                .pipe(skipWhile((payload) => payload === undefined))
                .subscribe((payload) => {
                    if (payload) {
                        if (!this.logged) {
                            this.getNotifications();
                        }

                        this.logged = true;
                        this.isVerifiedStudent = payload.isVerifiedStudent;
                        this.initials =
                            payload.firstName[0] + payload.lastName[0];
                        this.userRole = payload.role;
                        return;
                    }
                    if (this.logged) {
                        this.notificationPage = 1;
                        this.notificationPageCount = 1;
                        this.notifications = [];
                    }
                    this.logged = false;
                }),

            this.notificationService.pageCountChangedObservable.subscribe(
                (pageCount) => (this.notificationPageCount = pageCount)
            ),
            this.notificationService.notificationsChangedObservable.subscribe(
                (goToFirstPage) => {
                    if (goToFirstPage) {
                        this.notificationPage = 1;
                    }
                    this.getNotifications();
                }
            )
        );
        this.notificationService.init();
        this.getNotifications();
    }

    ngOnDestroy(): void {
        this.notificationService.destroy();
        this.subsink.forEach((sub) => sub.unsubscribe());
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

    getNotifications() {
        this.notificationService
            .getNotifications(this.notificationPage)
            .subscribe({
                next: (notifications) => {
                    this.notifications = notifications;
                },
                error: (err) => {
                    if (
                        err instanceof Error &&
                        err.message === 'page_over_page_count'
                    ) {
                        this.notificationPage = 1;
                        this.getNotifications();
                    }
                },
            });
    }

    prevNotificationPage() {
        if (this.notificationPage > 1) {
            this.notificationPage--;
            this.getNotifications();
        }
    }

    nextNotificationPage() {
        if (this.notificationPage < this.notificationPageCount) {
            this.notificationPage++;
            this.getNotifications();
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
