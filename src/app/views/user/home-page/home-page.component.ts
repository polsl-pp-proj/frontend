import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent {
    test_projects = [
        {
            id: 1,
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/pobrane.png',
        },
        {
            id: 1,
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/pobrane.png',
        },
        {
            id: 1,
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/pobrane.png',
        },
        {
            id: 1,
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/pobrane.png',
        },
        {
            id: 1,
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/pobrane.png',
        },
        {
            id: 1,
            name: 'Rakieta Elona',
            description:
                'Super szybka rakieta lecaca z predkoscia swiatla, mega szybka jest!!!!',
            image_url: 'assets/img/illustrations/pobrane.png',
        },
    ];

    constructor(private readonly router: Router) {}

    visitProject(projectId: number) {
        this.router.navigate(['project', projectId]);
    }
}
