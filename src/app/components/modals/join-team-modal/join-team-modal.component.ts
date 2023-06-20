import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { OpenPositionForProjectDto } from 'src/app/modules/project/modules/project-api/dtos/open-position-for-project.dto';
import { OpenPositionService } from 'src/app/modules/project/services/open-position.service';

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
        candidateSummary: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.maxLength(this.maxInputSize),
            ],
        }),
    });
    inTransit = false;

    constructor(
        private readonly openPositionService: OpenPositionService,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

    ngOnInit(): void {
        this.joinProjectForm
            .get('candidateSummary')!
            .valueChanges.subscribe((value) => {
                this.inputSize = value ? value.length : 0;
            });
    }

    sendJoinRequest() {
        this.inTransit = true;
        this.openPositionService
            .applyForOpenPosition(
                this.openPosition.id,
                this.joinProjectForm.controls.candidateSummary.value
            )
            .subscribe({
                next: () => {
                    this.inTransit = false;
                    this.toastrService.success(
                        'Wiadomość o Twojej chęci dołączenia do projektu została wysłana.',
                        'Zgłoszenie wysłane'
                    );
                    this.modalService.updateModalState(this.modalName, 'close');
                },
                error: () => {
                    this.inTransit = false;
                    this.toastrService.success(
                        'Podczas wysyłania wiadomości o Twojej chęci dołączenia do projektu wystąpił błąd. Spróbuj ponownie.',
                        'Błąd wysyłania zgłoszenia'
                    );
                },
            });
    }

    modalClosed() {
        this.joinProjectForm.reset();
    }
}
