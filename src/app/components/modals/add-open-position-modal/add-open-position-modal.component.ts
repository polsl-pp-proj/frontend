import { Component, EventEmitter, Output } from '@angular/core';
import {
    FormArray,
    FormBuilder,
    FormControl,
    Validators,
} from '@angular/forms';
import { NewOpenPositionDto } from 'src/app/dtos/new-open-position.dto';

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

    @Output()
    newOpenPosition = new EventEmitter<NewOpenPositionDto>();
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
        requirements: new FormArray<FormControl<string>>([]),
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

    addOpenPosition() {
        console.log(this.addOpenPositionForm);

        const newOpenPositionDto = new NewOpenPositionDto({
            name: this.addOpenPositionForm.controls.positionName.value,
            description: this.addOpenPositionForm.controls.description.value,
            requirements: [],
        });

        for (let i = 0; i < this.requirements.length; ++i) {
            newOpenPositionDto.requirements.push(
                this.addOpenPositionForm.controls.requirements
                    .at(i)
                    .get('newRequirement')?.value
            );
        }

        console.log(newOpenPositionDto);

        this.addOpenPositionForm.reset();
        this.newOpenPosition.emit(newOpenPositionDto);
    }

    modalClosed() {
        this.addOpenPositionForm.reset();
    }
}
