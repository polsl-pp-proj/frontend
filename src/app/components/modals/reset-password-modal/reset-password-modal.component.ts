import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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
    done = false;

    constructor(private readonly authService: AuthService) {}

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
                        this.done = true;
                        this.sent = false;
                        this.resetPasswordForm.reset();
                    },
                    error: (err: HttpErrorResponse) => {
                        this.sent = false;
                    },
                });
        }
    }
}
