import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { ModalService } from 'src/app/modules/modal/services/modal.service';

@Component({
    selector: 'app-reset-password-modal',
    templateUrl: './reset-password-modal.component.html',
    styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {
    static ModalName = 'reset-password-modal';
    get modalName() {
        return ResetPasswordModalComponent.ModalName;
    }

    resetPasswordForm = new FormGroup({
        emailAddress: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
    });

    inTransit = false;

    constructor(
        private readonly authService: AuthService,
        private readonly toastrService: ToastrService,
        private readonly modalService: ModalService
    ) {}

    ngOnInit(): void {}

    onRequestPasswordReset() {
        this.inTransit = true;

        if (this.resetPasswordForm.valid) {
            this.authService
                .requestPasswordReset(
                    this.resetPasswordForm.value.emailAddress!
                )
                .subscribe({
                    next: () => {
                        this.toastrService.success(
                            'Jeśli podany adres email jest przypisany do użytkownika, to zostanie na niego wysłana wiadomość z linkiem do zresetowania hasła.',
                            'Wiadomość wysłana'
                        );
                        this.modalService.updateModalState(
                            this.modalName,
                            'close'
                        );
                        this.inTransit = false;
                        this.resetPasswordForm.reset();
                    },
                    error: (err: HttpErrorResponse) => {
                        this.inTransit = false;
                        this.toastrService.error(
                            'Podczas próby wysłania linku resetowania hasła wystąpił błąd. Spróbuj ponownie później.',
                            'Wystąpił błąd'
                        );
                    },
                });
        }
    }
}
