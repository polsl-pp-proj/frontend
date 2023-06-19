import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { SubmissionService } from 'src/app/modules/submission/services/submission.service';

@Component({
    selector: 'app-reject-project-modal',
    templateUrl: './reject-project-modal.component.html',
    styleUrls: ['./reject-project-modal.component.scss'],
})
export class RejectProjectModalComponent {
    static ModalName = 'reject-project-modal';
    get modalName() {
        return RejectProjectModalComponent.ModalName;
    }

    @Input()
    projectDraftDto: ProjectDraftDto = {
        name: 'Projekt zielonej architektury',
        updatedAt: -1,
    } as ProjectDraftDto;
    @Input()
    submissionId!: number;

    maxInputSize: number = 500;

    rejectProjectForm = new FormGroup({
        reason: new FormControl<string>('', {
            nonNullable: true,
            validators: [
                Validators.required,
                Validators.maxLength(this.maxInputSize),
            ],
        }),
    });

    constructor(
        private readonly modalService: ModalService,
        private readonly submissionService: SubmissionService,
        private readonly toastrService: ToastrService,
        private readonly router: Router
    ) {}

    sendRejectRequest() {
        this.submissionService
            .rejectSubmission({
                submissionId: this.submissionId,
                draftLastModified: this.projectDraftDto.updatedAt,
                reason: this.rejectProjectForm.controls.reason.value,
            })
            .subscribe({
                next: () => {
                    this.toastrService.success(
                        'Zgłoszenie projektu zostało odrzucone',
                        'Zgłoszenie odrzucone'
                    );
                    this.modalService.updateModalState(this.modalName, 'close');
                    this.router.navigate(['admin', 'moderate', 'projects']);
                },
                error: (err) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === HttpStatusCode.Conflict) {
                            this.toastrService.error(
                                'Zgłoszenie zostało zmienione w trakcie moderacji',
                                'Błąd odrzucania zgłoszenia'
                            );
                            this.modalService.updateModalState(
                                this.modalName,
                                'close'
                            );
                            this.router.navigate([
                                'admin',
                                'moderate',
                                'projects',
                            ]);
                            return;
                        }
                    }
                    this.toastrService.error(
                        'Podczas próby odrzucenia zgłoszenia wystąpił błąd',
                        'Błąd odrzucania zgłoszenia'
                    );
                },
            });
    }

    modalClosed() {
        this.rejectProjectForm.reset();
    }
}
