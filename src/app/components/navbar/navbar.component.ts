import { Component, OnDestroy, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription, skipWhile } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit, OnDestroy {
    burgerIcon!: SafeHtml;
    xIcon!: SafeHtml;

    logged: boolean = false;
    expandedLeftMenu: boolean = false;
    expandedRightMenu: boolean = false;

    initials: string = '';

    authPayloadSubscription!: Subscription;

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
        this.authPayloadSubscription = this.authService.authTokenPayload
            .pipe(skipWhile((payload) => payload === undefined))
            .subscribe((payload) => {
                if (payload) {
                    this.logged = true;
                    this.initials = payload.firstName[0] + payload.lastName[0];
                    return;
                }
                this.logged = false;
            });
    }
    ngOnDestroy(): void {
        this.authPayloadSubscription.unsubscribe();
    }

    openLogin() {
        this.modalService.updateModalState('login-modal', 'open');
    }

    logout() {
        this.authService.logout().subscribe();
    }
}
