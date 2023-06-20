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
import { HelpService } from 'src/app/modules/help/services/help.service';

@Component({
    selector: 'app-project-moderation-page',
    templateUrl: './project-moderation-page.component.html',
    styleUrls: ['./project-moderation-page.component.scss'],
})
export class ProjectModerationPageComponent implements OnInit {
    projectDto: ProjectDto = {
        id: 5,
        name: 'Projekt rakiety studenckiej',
        shortDescription: 'Projekt rakiety studenckiej we współpracy z SpaceX.',
        description:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industrys standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.',
        fundingObjectives: '',
        organizationId: -1,
        organizationName: 'SKN SpaceLauncher',
        assets: [
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
            {
                title: 'zdj',
                url: 'https://placehold.co/1200x630',
                type: AssetType.Image,
            },
        ],

        categories: [
            {
                id: 1,
                name: 'biotechnologia',
            },
        ],
        openPositions: [
            {
                id: 67,
                name: 'Full stack developer',
                description:
                    'Full Stack Developer będzie zajmował się stworzeniem aplikacji internetowej do monitorowania aktualnego stanu zielonej architektury.',
                requirements: ['Angular', 'Java', 'NodeJS', 'C++'],
            },
            {
                id: 67,
                name: 'Full stack developer',
                description:
                    'Full Stack Developer będzie zajmował się stworzeniem aplikacji internetowej do monitorowania aktualnego stanu zielonej architektury.',
                requirements: ['Angular', 'Java', 'NodeJS', 'C++'],
            },
            {
                id: 67,
                name: 'Full stack developer',
                description:
                    'Full Stack Developer będzie zajmował się stworzeniem aplikacji internetowej do monitorowania aktualnego stanu zielonej architektury.',
                requirements: ['Angular', 'Java', 'NodeJS', 'C++'],
            },
        ],

        createdAt: 121,
        updatedAt: 122,
    };

    submissionId: number = -1;

    constructor(
        private readonly submissionService: SubmissionService,
        private readonly activatedRoute: ActivatedRoute,
        private readonly router: Router,
        private readonly modalService: ModalService,
        private readonly toastrService: ToastrService,
        private readonly helpService: HelpService
    ) {}

    ngOnInit() {
        this.helpService.registerPageHelp('admin/project-moderation-page');

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
                this.router.navigate(['admin', 'moderate', 'projects']);
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
                    this.router.navigate(['admin', 'moderate', 'projects']);
                },
                error: (err) => {
                    if (err instanceof HttpErrorResponse) {
                        if (err.status === HttpStatusCode.Conflict) {
                            this.toastrService.error(
                                'Zgłoszenie zostało zmienione w trakcie moderacji.',
                                'Błąd zatwierdzania zgłoszenia'
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
}
