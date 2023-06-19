import { Injectable } from '@angular/core';
import { SubmissionApiService } from '../modules/submission-api/services/submission-api.service';

@Injectable({
    providedIn: 'root',
})
export class SubmissionService {
    constructor(private readonly submissionApiService: SubmissionApiService) {}

    getSubmissions() {
        return this.submissionApiService.getSubmissions();
    }

    getSubmission(submissionId: number) {
        return this.submissionApiService.getSubmission(submissionId);
    }

    publishSubmission(submission: {
        submissionId: number;
        draftLastModified: number;
    }) {
        return this.submissionApiService.publishSubmission(submission);
    }

    rejectSubmission(submission: {
        submissionId: number;
        draftLastModified: number;
        reason: string;
    }) {
        return this.submissionApiService.rejectSubmission(submission);
    }
}
