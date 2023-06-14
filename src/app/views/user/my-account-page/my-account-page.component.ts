import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterEvent } from '@angular/router';
import { Subscription, skipWhile } from 'rxjs';
import { PastPaymentDto } from 'src/app/dtos/past-payment.dto';
import { ProjectCardDto } from 'src/app/dtos/project-card.dto';
import { AuthTokenPayloadDto } from 'src/app/modules/auth/dtos/auth-token-payload.dto';
import { UserOrganizationDto } from 'src/app/modules/auth/dtos/user-organization.dto';
import { UserRole } from 'src/app/modules/auth/enums/user-role.enum';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';

@Component({
    selector: 'app-my-account-page',
    templateUrl: './my-account-page.component.html',
    styleUrls: ['./my-account-page.component.scss'],
})
export class MyAccountPageComponent implements OnInit, OnDestroy {
    authPayloadSubscription!: Subscription;
    payload!: AuthTokenPayloadDto;

    constructor(
        private readonly authService: AuthService,
        private readonly router: Router
    ) {}

    projects: ProjectCardDto[] = [
        {
            projectId: 2,
            imageUrl: 'https://placehold.co/1200x630',
            imageAlt: 'alt',
            projectName: 'rakieta',
            projectDescription: 'fajna rakieta',
            projectOrg: 'Zmitac studio original',
        },
    ];

    payments: PastPaymentDto[] = [];

    roles = {
        [UserRole.BasicUser]: 'Użytkownik',
        [UserRole.Moderator]: 'Moderator',
        [UserRole.Administrator]: 'Administrator',
    };

    organizations: UserOrganizationDto[] = [
        {
            organizationId: 1,
            role: OrganizationMemberRole.Owner,
        },
        {
            organizationId: 2,
            role: OrganizationMemberRole.Member,
        },
        {
            organizationId: 3,
            role: OrganizationMemberRole.Member,
        },
    ];

    ngOnInit(): void {
        this.authPayloadSubscription = this.authService.authTokenPayload
            .pipe(skipWhile((payload) => payload === undefined))
            .subscribe((payload) => {
                if (payload) {
                    this.payload = payload;
                    return;
                }
                this.router.navigate(['/']);
            });

        for (let i = 0; i < 14; i++) {
            this.projects.push(this.projects[0]);
        }
    }

    ngOnDestroy(): void {
        this.authPayloadSubscription.unsubscribe();
    }

    visitProject(projectId: number) {
        this.router.navigate(['project', projectId]);
    }

    verifyStudentship() {
        this.payload.isVerifiedStudent = true;
    }
}
