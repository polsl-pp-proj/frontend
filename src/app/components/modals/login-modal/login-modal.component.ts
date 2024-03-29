import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { SignupModalComponent } from '../signup-modal/signup-modal.component';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
    static ModalName = 'login-modal';
    get modalName() {
        return LoginModalComponent.ModalName;
    }

    displayErrorMessage: boolean = false;

    loginForm = new FormGroup({
        emailAddress: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        password: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
    });

    constructor(
        private readonly authService: AuthService,
        private readonly modalService: ModalService
    ) {}

    login() {
        if (!this.loginForm.valid) {
            this.displayErrorMessage = true;
        } else {
            this.authService
                .login(
                    this.loginForm.value.emailAddress!,
                    this.loginForm.value.password!
                )
                .subscribe({
                    next: () => {
                        this.displayErrorMessage = false;
                        this.modalService.updateModalState(
                            this.modalName,
                            'close'
                        );
                    },
                    error: () => {
                        this.displayErrorMessage = true;
                    },
                });
        }
    }

    openSignup() {
        this.modalService.updateModalState(
            SignupModalComponent.ModalName,
            'open'
        );
    }
    openResetPassword() {
        this.modalService.updateModalState('reset-password-modal', 'open');
    }

    modalClosed() {
        this.loginForm.reset();
    }
}
