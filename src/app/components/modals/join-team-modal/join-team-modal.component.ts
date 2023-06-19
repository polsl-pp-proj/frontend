import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { OpenPositionForProjectDto } from 'src/app/modules/project/modules/project-api/dtos/open-position-for-project.dto';

@Component({
    selector: 'app-join-team-modal',
    templateUrl: './join-team-modal.component.html',
    styleUrls: ['./join-team-modal.component.scss'],
})
export class JoinTeamModalComponent implements OnInit {
    static ModalName = 'join-team-modal';
    get modalName() {
        return JoinTeamModalComponent.ModalName;
    }

    displayErrorMessage: boolean = false;

    @Input()
    openPosition: OpenPositionForProjectDto = {
        id: -1,
        name: 'Ładowanie...',
        projectId: -1,
        projectName: 'Ładowanie...',
        description: 'Ładowanie...',
        requirements: ['Ładowanie...'],
    };

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

    modalClosed() {
        this.joinProjectForm.reset();
    }
}
