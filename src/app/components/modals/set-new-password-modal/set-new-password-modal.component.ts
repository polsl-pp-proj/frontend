import { Component } from '@angular/core';
import {
    AbstractControl,
    FormControl,
    FormGroup,
    ValidationErrors,
    ValidatorFn,
    Validators,
} from '@angular/forms';
import { mustMatch } from 'src/app/validators/must-match.validator';

@Component({
    selector: 'app-set-new-password-modal',
    templateUrl: './set-new-password-modal.component.html',
    styleUrls: ['./set-new-password-modal.component.scss'],
})
export class SetNewPasswordModalComponent {
    setNewPasswordForm = new FormGroup(
        {
            newPassword: new FormControl<string>('', [
                Validators.required,
                Validators.maxLength(20),
                Validators.minLength(5),
            ]),
            repeatNewPassword: new FormControl<string>('', [
                Validators.required,
                Validators.maxLength(20),
                Validators.minLength(5),
            ]),
        },
        { validators: mustMatch('newPassword', 'repeatNewPassword', false) }
    );

    sendSetNewPasswordRequest() {
        //tbd
    }
}
