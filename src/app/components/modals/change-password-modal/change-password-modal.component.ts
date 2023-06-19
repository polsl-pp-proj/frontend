import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { mustMatch } from 'src/app/validators/must-match.validator';

@Component({
    selector: 'app-change-password-modal',
    templateUrl: './change-password-modal.component.html',
    styleUrls: ['./change-password-modal.component.scss'],
})
export class ChangePasswordModalComponent {
    static ModalName = 'change-password-modal';
    get modalName() {
        return ChangePasswordModalComponent.ModalName;
    }

    changePasswordForm = new FormGroup(
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
        this.inTransit = true;
        this.authService
            .changePassword(this.changePasswordForm.controls.newPassword.value)
            .subscribe({
                next: () => {
                    this.toastrService.success(
                        'Twoje hasło zostało zmienione.',
                        'Hasło zmienione'
                    );
                    this.modalService.updateModalState(this.modalName, 'close');
                    this.inTransit = false;
                },
                error: (err: HttpErrorResponse) => {
                    this.inTransit = false;
                    this.toastrService.error(
                        'Podczas próby zmiany hasła wystąpił błąd. Spróbuj ponownie',
                        'Zmiana hasła nie powiodła się'
                    );
                },
            });
    }

    modalClosed() {
        this.changePasswordForm.reset();
    }
}
