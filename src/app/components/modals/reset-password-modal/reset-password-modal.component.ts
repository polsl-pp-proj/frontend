import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-reset-password-modal',
    templateUrl: './reset-password-modal.component.html',
    styleUrls: ['./reset-password-modal.component.scss'],
})
export class ResetPasswordModalComponent implements OnInit {
    resetPasswordForm: FormGroup;
    done: boolean = false;

    constructor() {
        this.resetPasswordForm = new FormGroup({
            emailAddress: new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
        });
    }

    ngOnInit(): void {}

    onRequestPasswordReset() {
        this.done = true;

        
    }
}
