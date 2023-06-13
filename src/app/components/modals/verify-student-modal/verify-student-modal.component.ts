import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
    selector: 'app-verify-student-modal',
    templateUrl: './verify-student-modal.component.html',
    styleUrls: ['./verify-student-modal.component.scss'],
})
export class VerifyStudentModalComponent {
    static ModalName = 'verify-student-modal';
    get modalName() {
        return VerifyStudentModalComponent.ModalName;
    }

    form = new FormGroup({
        university: new FormControl<string>('', {
            validators: [Validators.required],
            nonNullable: true,
        }),
        email: new FormControl<string>('', {
            validators: [Validators.required, Validators.email],
            nonNullable: true,
        }),
    });

    universities: { text: string; value: string }[] = [
        { text: 'szkola melanzu', value: '1' },
        { text: 'szkola melanzu', value: '1' },
        { text: 'szkola melanzu', value: '1' },
    ];
}
