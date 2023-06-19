import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { OrganizationDto } from 'src/app/modules/organization/modules/organization-api/dtos/organization.dto';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

@Component({
    selector: 'app-manage-organizations-page',
    templateUrl: './manage-organizations-page.component.html',
    styleUrls: ['./manage-organizations-page.component.scss'],
})
export class ManageOrganizationsPageComponent implements OnInit {
    organizations: OrganizationDto[] = [];

    eyeIcon!: SafeHtml;

    constructor(
        private readonly iconVaultService: IconVaultService,
        private readonly organizationService: OrganizationService
    ) {}

    ngOnInit(): void {
        this.organizationService
            .getAllOrganizations()
            .subscribe((organizations) => (this.organizations = organizations));

        this.iconVaultService.getIcon('eye').subscribe((icon) => {
            this.eyeIcon = icon!;
        });
    }
}
