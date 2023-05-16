import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { OrganizationService } from 'src/app/modules/organization/services/organization.service';

@Component({
    selector: 'app-organization-page',
    templateUrl: './organization-page.component.html',
    styleUrls: ['./organization-page.component.scss'],
})
export class OrganizationPageComponent implements OnInit {
    organizationName = 'Trwa ładowanie...';

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
        private readonly toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        const organizationId =
            this.activatedRoute.snapshot.paramMap.get('organizationId');
        if (organizationId) {
            this.organizationService
                .getOrganization(+organizationId)
                .subscribe({
                    next: (organization) => {
                        this.organizationName = organization.name;
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
