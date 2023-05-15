import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SignupService } from 'src/app/modules/auth/services/signup.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
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

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly authService: AuthService,
        private readonly signupService: SignupService
    ) {}

    ngOnInit(): void {
        const params = this.activatedRoute.snapshot.queryParamMap;
        if (params.has('signup')) {
            if (params.has('confirm')) {
                const email = params.get('email'),
                    token = params.get('token');
                if (email && token) {
                    this.confirmSignup(email, token);
                }
            }
        }
        if (params.has('reset-password')) {
            const email = params.get('email'),
                token = params.get('token');
            if (email && token) {
                this.resetPassword(email, token);
            }
        }
    }

    confirmSignup(email: string, token: string) {
        this.signupService.confirmSignup(email, token).subscribe({
            next: () => {
                // TODO: Display toast
            },
            error: (err: HttpErrorResponse) => {
                // TODO: Display toast
            },
        });

        this.replaceState();
    }
    resetPassword(email: string, token: string) {
        this.authService.confirmPasswordReset(email, token).subscribe({
            next: () => {
                // TODO: Display toast
            },
            error: (err: HttpErrorResponse) => {
                // TODO: Display toast
            },
        });

        this.replaceState();
    }

    visitProject(projectId: number) {
        this.router.navigate(['project', projectId]);
    }

    replaceState() {
        this.location.replaceState('/', '');
    }
}
