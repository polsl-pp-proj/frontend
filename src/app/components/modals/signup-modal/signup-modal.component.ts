import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SignupService } from 'src/app/modules/auth/services/signup.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { mustMatch } from 'src/app/validators/must-match.validator';

@Component({
    selector: 'app-signup-modal',
    templateUrl: './signup-modal.component.html',
    styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent {
    static ModalName = 'signup-modal';
    get modalName() {
        return SignupModalComponent.ModalName;
    }

    signupForm = new FormGroup(
        {
            firstName: new FormControl<string>('', [Validators.required]),
            lastName: new FormControl<string>('', [Validators.required]),
            emailAddress: new FormControl<string>('', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl<string>('', [
                Validators.required,
                Validators.minLength(5),
            ]),
            repeatPassword: new FormControl<string>('', [
                Validators.required,
                Validators.minLength(5),
            ]),
            acceptRules: new FormControl<boolean>(false, [
                Validators.requiredTrue,
            ]),
        },
        { validators: mustMatch('password', 'repeatPassword', false) }
    );

    constructor(
        private readonly signupService: SignupService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

    signup() {
        if (this.signupForm.valid) {
            this.signupService
                .signup({
                    firstName: this.signupForm.value.firstName!,
                    lastName: this.signupForm.value.lastName!,
                    emailAddress: this.signupForm.value.emailAddress!,
                    password: this.signupForm.value.password!,
                    consent: this.signupForm.value.acceptRules!,
                })
                .subscribe({
                    next: () => {
                        this.toastrService.success(
                            'Potwierdź teraz rejestrację, klikając w link wiadomości, którą właśnie wysłaliśmy.',
                            'Konto stworzone'
                        );
                        this.modalService.updateModalState(
                            this.modalName,
                            'close'
                        );
                    },
                    error: (error: HttpErrorResponse) => {
                        // TODO: handle signup errors
                    },
                });
        }
    }
}
