import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-join-team-modal',
    templateUrl: './join-team-modal.component.html',
    styleUrls: ['./join-team-modal.component.scss'],
})
export class JoinTeamModalComponent implements OnInit {
    displayErrorMessage: boolean = false;

    projectName = 'Projekt zielonej architektury';
    positionName = 'full stack developer';

    actualInputValue: string = '';
    inputSize: number = 0;
    maxInputSize: number = 500;

    joinProjectForm = new FormGroup({
        candidateSummary: new FormControl<string>('', [
            Validators.required,
            Validators.maxLength(this.maxInputSize),
        ]),
    });

    ngOnInit(): void {
        this.joinProjectForm
            .get('candidateSummary')!
            .valueChanges.subscribe((value) => {
                this.inputSize = value ? value.length : 0;
            });
    }

    sendJoinRequest() {
        console.log(this.joinProjectForm.get('candidateSummary')?.value);
    }
}
