import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Subscription, skipWhile } from 'rxjs';
import { ChangePasswordModalComponent } from 'src/app/components/modals/change-password-modal/change-password-modal.component';
import { VerifyStudentModalComponent } from 'src/app/components/modals/verify-student-modal/verify-student-modal.component';
import { PastPaymentDto } from 'src/app/dtos/past-payment.dto';
import { ProjectCardDto } from 'src/app/dtos/project-card.dto';
import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';
import { AuthTokenPayloadDto } from 'src/app/modules/auth/dtos/auth-token-payload.dto';
import { UserOrganizationDto } from 'src/app/modules/auth/dtos/user-organization.dto';
import { UserRole } from 'src/app/modules/auth/enums/user-role.enum';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { StudentshipService } from 'src/app/modules/auth/services/studentship.service';
import { FavoriteService } from 'src/app/modules/favorite/services/favorite.service';
import { HelpService } from 'src/app/modules/help/services/help.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';
import { OrganizationDto } from 'src/app/modules/organization/modules/organization-api/dtos/organization.dto';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

@Component({
    selector: 'app-my-account-page',
    templateUrl: './my-account-page.component.html',
    styleUrls: ['./my-account-page.component.scss'],
})
export class MyAccountPageComponent implements OnInit, OnDestroy {
    subsink: Subscription[] = [];
    payload!: AuthTokenPayloadDto;

    payments: PastPaymentDto[] = [];

    roles = {
        [UserRole.BasicUser]: 'Użytkownik',
        [UserRole.Moderator]: 'Moderator',
        [UserRole.Administrator]: 'Administrator',
    };
    organizationRoles = {
        [OrganizationMemberRole.Member]: 'Członek',
        [OrganizationMemberRole.Owner]: 'Właściciel',
    };

    organizations: OrganizationDto[] = [];

    get organizationsWithRoles(): (OrganizationDto & {
        role: OrganizationMemberRole;
    })[] {
        return this.organizations.map((organization) => ({
            ...organization,
            role:
                this.payload.organizations.find(
                    (userOrg) => userOrg.organizationId === organization.id
                )?.role ?? OrganizationMemberRole.Member,
        }));
    }

    favoriteProjects: SimpleProjectDto[] = [];

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router,
        private readonly modalService: ModalService,
        private readonly organizationService: OrganizationService,
        private readonly favoriteService: FavoriteService,
        private readonly helpService: HelpService
    ) {}

    ngOnInit(): void {
        this.helpService.registerPageHelp('user/my-account-page');

        this.subsink.push(
            this.authService.authTokenPayload
                .pipe(skipWhile((payload) => payload === undefined))
                .subscribe((payload) => {
                    if (payload) {
                        this.payload = payload;
                        return;
                    }
                    this.router.navigate(['/']);
                })
        );

        this.organizationService
            .getOwnOrganizations()
            .subscribe((organizations) => {
                this.organizations = organizations;
            });

        this.favoriteService
            .getFullFavorites()
            .subscribe((favorites) => (this.favoriteProjects = favorites));
    }

    ngOnDestroy(): void {
        this.subsink.forEach((sub) => sub.unsubscribe());
    }

    visitProject(projectId: number) {
        this.router.navigate(['/project', projectId]);
    }

    verifyStudentship() {
        this.modalService.updateModalState(
            VerifyStudentModalComponent.ModalName,
            'open'
        );
    }

    changePassword() {
        this.modalService.updateModalState(
            ChangePasswordModalComponent.ModalName,
            'open'
        );
    }
}
