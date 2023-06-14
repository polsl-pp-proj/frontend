import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthTokenPayloadDto } from 'src/app/modules/auth/dtos/auth-token-payload.dto';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { OrganizationMemberRole } from 'src/app/modules/organization/enums/organization-member-role.enum';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

@Component({
    selector: 'app-organization-page',
    templateUrl: './organization-page.component.html',
    styleUrls: ['./organization-page.component.scss'],
})
export class OrganizationPageComponent implements OnInit {
    organizationId = -1;
    organizationName = 'Trwa ładowanie...';
    isMember!: boolean;
    isOwner!: boolean;

    test_projects = [
        {
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/about1.svg',
        },
        {
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/about1.svg',
        },
        {
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/about1.svg',
        },
        {
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/about1.svg',
        },
        {
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/about1.svg',
        },
        {
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/about1.svg',
        },
    ];

    test_positions = [
        {
            name: 'Programista Fullstack',
            description:
                'Programista z umiejętnościami analitycznymi i dobrym skillem',
            requirements: ['React', 'Django', 'Postgres'],
        },
        {
            name: 'Programista Fullstack',
            description:
                'Programista z umiejętnościami analitycznymi i dobrym skillem',
            requirements: ['React', 'Django', 'Postgres'],
        },
        {
            name: 'Programista Fullstack',
            description:
                'Programista z umiejętnościami analitycznymi i dobrym skillem',
            requirements: ['React', 'Django', 'Postgres'],
        },
    ];

    constructor(
        private readonly activatedRoute: ActivatedRoute,
        private readonly organizationService: OrganizationService,
        private readonly router: Router,
        private readonly toastrService: ToastrService,
        private readonly authService: AuthService
    ) {}

    ngOnInit(): void {
        const organizationId =
            this.activatedRoute.snapshot.paramMap.get('organizationId');
        if (organizationId) {
            this.organizationId = +organizationId;
            this.organizationService
                .getOrganization(this.organizationId)
                .subscribe({
                    next: (organization) => {
                        this.organizationName = organization.name;
                        this.authService.authTokenPayload.subscribe(
                            (
                                authTokenPayload:
                                    | AuthTokenPayloadDto
                                    | null
                                    | undefined
                            ) => {
                                if (authTokenPayload) {
                                    const userOrganization =
                                        authTokenPayload.organizations.find(
                                            (org: { organizationId: number }) =>
                                                org.organizationId ===
                                                this.organizationId
                                        );

                                    if (userOrganization) {
                                        this.isMember = true;
                                        this.isOwner =
                                            userOrganization.role ===
                                            OrganizationMemberRole.Owner;
                                    }
                                }
                            }
                        );
                    },
                    error: () => {
                        this.router.navigate(['/']);
                        this.toastrService.info(
                            'Odwiedzona przez Ciebie organizacja nie istnieje!',
                            'Organizacja nie istnieje'
                        );
                    },
                });

            return;
        }
        this.router.navigate(['/']);
    }
}
