import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { mustMatch } from 'src/app/validators/must-match.validator';

@Component({
    selector: 'app-set-new-password-modal',
    templateUrl: './set-new-password-modal.component.html',
    styleUrls: ['./set-new-password-modal.component.scss'],
})
export class SetNewPasswordModalComponent {
    static ModalName = 'set-new-password-modal';
    get modalName() {
        return SetNewPasswordModalComponent.ModalName;
    }

    setNewPasswordForm = new FormGroup(
        {
            newPassword: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(5)],
            }),
            repeatNewPassword: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required, Validators.minLength(5)],
            }),
        },
        { validators: mustMatch('newPassword', 'repeatNewPassword', false) }
    );

    inTransit = false;

    constructor(
        private readonly authService: AuthService,
        private readonly toastrService: ToastrService,
        private readonly modalService: ModalService
    ) {}

    setNewPassword() {
        if (this.setNewPasswordForm.valid) {
            this.inTransit = true;
            this.authService
                .confirmPasswordReset(
                    this.setNewPasswordForm.controls.newPassword.value
                )
                .subscribe({
                    next: () => {
                        this.toastrService.success(
                            'Twoje hasło zostało zresetowane.',
                            'Hasło zresetowane'
                        );
                        this.modalService.updateModalState(
                            this.modalName,
                            'close'
                        );
                        this.setNewPasswordForm.reset();
                        this.inTransit = false;
                    },
                    error: (err: HttpErrorResponse) => {
                        this.inTransit = false;
                        switch (err.status) {
                            case 404: {
                                this.toastrService.error(
                                    'Link resetowania jest niepoprawny lub wygasł!',
                                    'Resetowanie hasła nie powiodło się'
                                );
                                break;
                            }
                            default: {
                                this.toastrService.error(
                                    'Podczas resetowania hasła wystąpił błąd. Spróbuj ponownie później.',
                                    'Resetowanie hasła nie powiodło się'
                                );
                            }
                        }
                    },
                });
        }
    }

    modalClosed() {
        this.setNewPasswordForm.reset();
    }
}
