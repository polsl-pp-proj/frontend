import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubmissionDto } from 'src/app/modules/submission/modules/submission-api/dtos/submission.dto';
import { SubmissionService } from 'src/app/modules/submission/services/submission.service';

@Component({
    selector: 'app-projects-moderation-page',
    templateUrl: './projects-moderation-page.component.html',
    styleUrls: ['./projects-moderation-page.component.scss'],
})
export class ProjectsModerationPageComponent implements OnInit {
    projectSubmissions: SubmissionDto[] = [];

    constructor(
        private readonly submissionService: SubmissionService,
        private readonly router: Router
    ) {}

    ngOnInit() {
        this.submissionService.getSubmissions().subscribe((submissions) => {
            this.projectSubmissions = submissions;
        });
    }

    goToProjectModeration(submissionId: number) {
        this.router.navigate(['/admin', 'moderate', 'project', submissionId]);
    }
}
