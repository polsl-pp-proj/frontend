import { Location } from '@angular/common';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { SetNewPasswordModalComponent } from 'src/app/components/modals/set-new-password-modal/set-new-password-modal.component';
import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { SignupService } from 'src/app/modules/auth/services/signup.service';
import { StudentshipService } from 'src/app/modules/auth/services/studentship.service';
import { DonationService } from 'src/app/modules/donation/services/donation.service';
import { HelpService } from 'src/app/modules/help/services/help.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { ProjectService } from 'src/app/modules/project/services/project.service';

@Component({
    selector: 'app-home-page',
    templateUrl: './home-page.component.html',
    styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
    mostLikedProjects: SimpleProjectDto[] = [];
    newestProjects: SimpleProjectDto[] = [];

    constructor(
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
        private readonly location: Location,
        private readonly authService: AuthService,
        private readonly signupService: SignupService,
        private readonly toastrService: ToastrService,
        private readonly helpService: HelpService,
        private readonly modalService: ModalService,
        private readonly donationService: DonationService,
        private readonly studentshipService: StudentshipService,
        private readonly projectService: ProjectService
    ) {}

    ngOnInit(): void {
        this.helpService.registerPageHelp('user/home-page');

        this.projectService
            .getMostLikedProjects()
            .subscribe((mostLiked) => (this.mostLikedProjects = mostLiked));
        this.projectService
            .getNewestProjects()
            .subscribe((newest) => (this.newestProjects = newest));

        const params = this.activatedRoute.snapshot.queryParamMap;
        this.replaceState();
        if (params.has('signup')) {
            if (params.has('confirm')) {
                const email = params.get('email'),
                    token = params.get('token');
                if (email && token) {
                    this.confirmSignup(email, token);
                }
            }
        }
        if (params.has('studentship')) {
            if (params.has('confirm')) {
                const email = params.get('email'),
                    token = params.get('token');
                if (email && token) {
                    this.confirmStudentshipVerification(email, token);
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
        if (params.has('df')) {
            const clientSecret = params.get('payment_intent_client_secret');
            if (clientSecret) {
                this.checkPaymentStatus(clientSecret);
            }
        }
    }

    confirmSignup(email: string, token: string) {
        this.signupService.confirmSignup(email, token.slice(0, 36)).subscribe({
            next: () => {
                this.toastrService.success(
                    'Twoje konto zostało aktywowane! Możesz się teraz zalogować.',
                    'Konto aktywowane'
                );
            },
            error: (err: HttpErrorResponse) => {
                switch (err.status) {
                    case 404: {
                        this.toastrService.error(
                            'Link aktywacyjny jest niepoprawny lub wygasł!',
                            'Aktywacja konta nie powiodła się'
                        );
                        break;
                    }
                    default: {
                        this.toastrService.error(
                            'Podczas aktywowania konta wystąpił błąd. Spróbuj ponownie później.',
                            'Aktywacja konta nie powiodła się'
                        );
                    }
                }
            },
        });
    }
    confirmStudentshipVerification(email: string, token: string) {
        this.studentshipService
            .confirmStudentshipVerification(email, token.slice(0, 36))
            .subscribe({
                next: () => {
                    this.toastrService.success(
                        'Twoje konto zostało zweryfikowane! Możesz teraz tworzyć organizacje studenckie i dodawać w ich imieniu projekty studenckie.',
                        'Konto zweryfikowane'
                    );
                    this.authService.refresh().subscribe();
                },
                error: (err: HttpErrorResponse) => {
                    switch (err.status) {
                        case 404: {
                            this.toastrService.error(
                                'Link weryfikacyjny jest niepoprawny lub wygasł!',
                                'Weryfikacja konta nie powiodła się'
                            );
                            break;
                        }
                        default: {
                            this.toastrService.error(
                                'Podczas weryfikowania konta wystąpił błąd. Spróbuj ponownie później.',
                                'Weryfikacja konta nie powiodła się'
                            );
                        }
                    }
                },
            });
    }
    resetPassword(email: string, token: string) {
        this.authService.setEmailTokenParams(email, token.slice(0, 36));
        this.modalService.updateModalState(
            SetNewPasswordModalComponent.ModalName,
            'open'
        );
    }
    checkPaymentStatus(clientSecret: string) {
        this.donationService.checkPaymentStatus(clientSecret).subscribe();
    }

    visitProject(projectId: number) {
        this.router.navigate(['project', projectId]);
    }

    replaceState() {
        this.location.replaceState('/', '');
    }
}
