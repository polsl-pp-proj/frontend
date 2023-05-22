import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { HelpService } from '../../modules/help/services/help.service';
import { SafeHtml } from '@angular/platform-browser';
import { Subscription } from 'rxjs';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';

@Component({
    selector: 'app-help',
    templateUrl: './help.component.html',
    styleUrls: ['./help.component.scss'],
})
export class HelpComponent implements OnInit, OnDestroy {
    currentHelpDoc!: SafeHtml | null;
    helpIcon!: SafeHtml;

    @HostBinding('class.show-help')
    showHelp = false;

    currentHelpDocSubscription!: Subscription;

    constructor(
        private readonly helpService: HelpService,
        private readonly iconVaultService: IconVaultService
    ) {}

    ngOnInit(): void {
        this.currentHelpDocSubscription =
            this.helpService.currentPageHelpObservable.subscribe(
                (currentHelpDoc) => {
                    this.currentHelpDoc = currentHelpDoc;
                }
            );
        this.iconVaultService
            .getIcon('ion_help')
            .subscribe((icon: SafeHtml | null) => {
                this.helpIcon = icon!;
            });
    }

    ngOnDestroy(): void {
        this.currentHelpDocSubscription.unsubscribe();
    }
}
