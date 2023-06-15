export class SubmissionPatchDto {
    draftLastModified!: number;
    reason?: string;

    constructor(submissionPatch: SubmissionPatchDto) {
        Object.assign(this, submissionPatch);
    }
}
