import { Component } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';

@Component({
    selector: 'app-add-open-position-modal',
    templateUrl: './add-open-position-modal.component.html',
    styleUrls: ['./add-open-position-modal.component.scss'],
})
export class AddOpenPositionModalComponent {
    static ModalName = 'add-open-position-modal';
    get modalName() {
        return AddOpenPositionModalComponent.ModalName;
    }

    constructor(private fb: FormBuilder) {}

    addOpenPositionForm = this.fb.group({
        positionName: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required],
        }),
        description: new FormControl<string>('', {
            nonNullable: true,
            validators: [Validators.required, Validators.maxLength(500)],
        }),
        requirements: new FormArray<FormGroup>([]),
    });

    addRequirement() {
        const newRequirementForm = this.fb.group({
            newRequirement: new FormControl<string>('', {
                nonNullable: true,
                validators: [Validators.required],
            }),
        });

        this.requirements.push(newRequirementForm);
    }

    removeRequirement(index: number) {
        this.requirements.removeAt(index);
    }

    get requirements() {
        return this.addOpenPositionForm.controls['requirements'] as FormArray;
    }

    ngOnInit() {
        this.addRequirement();
    }

    sendAddOpenPositionRequest() {
        console.log(this.addOpenPositionForm);
    }

    modalClosed() {
        this.addOpenPositionForm.reset();
    }
}
