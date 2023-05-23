import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
    selector: 'app-reject-project-modal',
    templateUrl: './reject-project-modal.component.html',
    styleUrls: ['./reject-project-modal.component.scss'],
})
export class RejectProjectModalComponent implements OnInit {
    static ModalName = 'reject-project-modal';
    get modalName() {
        return RejectProjectModalComponent.ModalName;
    }

    displayErrorMessage: boolean = false;

    projectName = 'Projekt zielonej architektury';

    actualInputValue: string = '';
    inputSize: number = 0;
    maxInputSize: number = 500;

    rejectProjectForm = new FormGroup({
        reason: new FormControl<string>('', [
            Validators.required,
            Validators.maxLength(this.maxInputSize),
        ]),
    });

    ngOnInit(): void {
        this.rejectProjectForm
            .get('reason')!
            .valueChanges.subscribe((value) => {
                this.inputSize = value ? value.length : 0;
            });
    }

    sendRejectRequest() {}
}
