import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { submissionApiRoutes } from '../submission-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { SubmissionDto } from '../dtos/submission.dto';
import { SubmissionPatchDto } from '../dtos/submission-patch.dto';
import { ProjectDto } from 'src/app/dtos/project.dto';

@Injectable({
    providedIn: 'root',
})
export class SubmissionApiService {
    constructor(private readonly apiService: CoreApiService) {}

    getSubmissions() {
        return this.apiService.request<SubmissionDto[]>(
            submissionApiRoutes.GET_submissions,
            new ApiOptions() as ApiOptionsBody
        );
    }

    getSubmission(submissionId: number) {
        return this.apiService.request<ProjectDto>(
            submissionApiRoutes.GET_submission,
            new ApiOptions({ routeParams: { submissionId } }) as ApiOptionsBody
        );
    }

    publishSubmission({
        submissionId,
        draftLastModified,
    }: {
        submissionId: number;
        draftLastModified: number;
    }) {
        return this.apiService.request(
            submissionApiRoutes.PATCH_publishSubmission,
            new SubmissionPatchDto({ draftLastModified }),
            new ApiOptions({ routeParams: { submissionId } }) as ApiOptionsBody
        );
    }

    rejectSubmission({
        submissionId,
        draftLastModified,
        reason,
    }: {
        submissionId: number;
        draftLastModified: number;
        reason: string;
    }) {
        return this.apiService.request(
            submissionApiRoutes.PATCH_rejectSubmission,
            new SubmissionPatchDto({ draftLastModified, reason }),
            new ApiOptions({ routeParams: { submissionId } }) as ApiOptionsBody
        );
    }
}
