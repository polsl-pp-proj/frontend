import { Component, OnInit } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { UserOrganizationDto } from 'src/app/modules/auth/dtos/user-organization.dto';
import { IconVaultService } from 'src/app/modules/icon-vault/services/icon-vault.service';
import { SimpleUserDto } from 'src/app/modules/user/modules/user-api/dtos/user.dto';
import { UserService } from 'src/app/modules/user/services/user.service';

@Component({
    selector: 'app-manage-users-page',
    templateUrl: './manage-users-page.component.html',
    styleUrls: ['./manage-users-page.component.scss'],
})
export class ManageUsersPageComponent implements OnInit {
    usersList: SimpleUserDto[] = [];

    eyeIcon!: SafeHtml;

    constructor(
        private readonly userService: UserService,
        private readonly iconVaultService: IconVaultService
    ) {}

    ngOnInit() {
        this.userService
            .getUsers()
            .subscribe((users) => (this.usersList = users));

        this.iconVaultService.getIcon('eye').subscribe((icon) => {
            this.eyeIcon = icon!;
        });
    }
}
