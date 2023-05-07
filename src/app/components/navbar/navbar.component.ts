import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
    burgerIcon!: SafeHtml;
    xIcon!: SafeHtml;

    logged: boolean = false;
    expandedLeftMenu: boolean = false;
    expandedRightMenu: boolean = false;

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly router: Router
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
    }
}
