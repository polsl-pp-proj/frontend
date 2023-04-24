import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-login-modal',
    templateUrl: './login-modal.component.html',
    styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
    displayErrorMessage: boolean = false;

    loginForm = new FormGroup({
        emailAddress: new FormControl<string>('', [
            Validators.required,
            Validators.email,
        ]),
        password: new FormControl<string>('', [Validators.required]),
    });

    constructor() {
        console.log(this.loginForm.valid);
    }

    login() {
        if (!this.loginForm.valid) {
            this.displayErrorMessage = true;
        } else {
            this.displayErrorMessage = false;
        }
    }
}
