import { SubmissionStatus } from '../enums/submission-status.enum';

export class SubmissionDto {
    id!: number;
    projectDraftName!: string;
    projectDraftId!: number;
    status!: SubmissionStatus;
    createdAt!: number;
}
