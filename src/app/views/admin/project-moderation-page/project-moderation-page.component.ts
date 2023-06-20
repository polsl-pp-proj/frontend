import { HttpErrorResponse, HttpStatusCode } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { RejectProjectModalComponent } from 'src/app/components/modals/reject-project-modal/reject-project-modal.component';
import { OpenPositionDto } from 'src/app/dtos/open-position.dto';
import { AssetType } from 'src/app/enums/asset-type.enum';
import { ModalService } from 'src/app/modules/modal/services/modal.service';
import { SubmissionService } from 'src/app/modules/submission/services/submission.service';
import Swiper from 'swiper';
import { ProjectDto } from 'src/app/dtos/project.dto';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-project-moderation-page',
    templateUrl: './project-moderation-page.component.html',
    styleUrls: ['./project-moderation-page.component.scss'],
})
export class ProjectModerationPageComponent implements OnInit {
    projectDto: ProjectDto = {
        id: -1,
        name: 'Ładowanie...',
        shortDescription: 'Ładowanie...',
        description: 'Ładowanie...',
        fundingObjectives: '',
        organizationId: -1,
        organizationName: 'Ładowanie...',
        assets: [
            {
                title: 'Ładowanie...',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
        ],
        categories: [
            {
                id: -1,
                name: '',
            },
        ],
        openPositions: [],
        createdAt: -1,
        updatedAt: -1,
    };

    submissionId: number = -1;

    constructor(
        private readonly submissionService: SubmissionService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService
    ) {}

    ngOnInit() {
        const submissionId =
            this.activatedRoute.snapshot.paramMap.get('submissionId');
        if (!submissionId) {
            this.router.navigate(['/404']);
            return;
        }
        this.submissionId = +submissionId;

        this.submissionService.getSubmission(this.submissionId).subscribe({
            next: (projectDraftDto) => {
                this.projectDto = projectDraftDto;
            },
            error: (err) => {
                if (err instanceof HttpErrorResponse) {
                    if (err.status === HttpStatusCode.NotFound) {
                        this.router.navigate(['/404']);
                        return;
                    }
                }
                this.toastrService.error(
                    'Podczas próby pobrania zgłoszenia wystąpił błąd. Spróbuj ponownie.',
                    'Błąd pobierania zgłoszenia'
                );
                this.router.navigate(['/admin', 'moderate', 'projects']);
            },
        });
    }

    publishSubmission() {
        this.submissionService
            .publishSubmission({
                submissionId: this.submissionId,
                draftLastModified: this.projectDto.updatedAt,
            })
            .subscribe({
                next: () => {
                    this.toastrService.success(
                        'Zgłoszenie projektu zostało zatwierdzone.',
                        'Zgłoszenie zatwierdzone'
                    );
                    this.router.navigate(['/admin', 'moderate', 'projects']);
                },
                error: (err) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === HttpStatusCode.Conflict) {
                            this.toastrService.error(
                                'Zgłoszenie zostało zmienione w trakcie moderacji.',
                                'Błąd zatwierdzania zgłoszenia'
                            );
                            this.router.navigate([
                                '/admin',
                                'moderate',
                                'projects',
                            ]);
                            return;
                        }
                    }
                    this.toastrService.error(
                        'Podczas próby zatwierdzenia zgłoszenia wystąpił błąd.',
                        'Błąd zatwierdzania zgłoszenia'
                    );
                },
            });
    }

    rejectSubmission() {
        this.modalService.updateModalState(
            RejectProjectModalComponent.ModalName,
            'open'
        );
    }

    remoteAssetsPath = environment.remoteAssetsPath;
}
