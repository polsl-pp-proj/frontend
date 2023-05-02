import { Component } from '@angular/core';

@Component({
    selector: 'app-organisation-page',
    templateUrl: './organisation-page.component.html',
    styleUrls: ['./organisation-page.component.scss'],
})
export class OrganisationPageComponent {
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
}
