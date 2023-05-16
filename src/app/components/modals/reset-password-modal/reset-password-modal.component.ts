import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
    selector: 'app-reset-password-modal',
    templateUrl: './reset-password-modal.component.html',
    styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {
    resetPasswordForm = new FormGroup({
        emailAddress: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.email],
        }),
    });

    sent = false;

    constructor(
        private readonly authService: AuthService,
        private readonly toastrService: ToastrService
    ) {}

    ngOnInit(): void {}

    onRequestPasswordReset() {
        this.sent = true;

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
                        this.sent = false;
                        this.resetPasswordForm.reset();
                    },
                    error: (err: HttpErrorResponse) => {
                        this.sent = false;
                        this.toastrService.error(
                            'Podczas próby wysłania linku resetowania hasła wystąpił błąd. Spróbuj ponownie później.',
                            'Wystąpił błąd'
                        );
                    },
                });
        }
    }
}
