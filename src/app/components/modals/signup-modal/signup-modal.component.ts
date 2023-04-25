import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { mustMatch } from 'src/app/validators/must-match.validator';

@Component({
    selector: 'app-signup-modal',
    templateUrl: './signup-modal.component.html',
    styleUrls: ['./signup-modal.component.scss'],
})
export class SignupModalComponent {
    signupForm = new FormGroup(
        {
            firstName: new FormControl<string>('', [Validators.required]),
            lastName: new FormControl<string>('', [Validators.required]),
            emailAddress: new FormControl<string>('', [
                Validators.required,
                Validators.email,
            ]),
            password: new FormControl<string>('', [Validators.required]),
            repeatPassword: new FormControl<string>('', [Validators.required]),
            acceptRules: new FormControl<boolean>(false, [
                Validators.requiredTrue,
            ]),
        },
        { validators: mustMatch('password', 'repeatPassword', false) }
    );

    onClick() {
        console.log(this.signupForm.value);
    }
}