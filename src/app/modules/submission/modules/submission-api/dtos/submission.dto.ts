import { SubmissionStatus } from '../enums/submission-status.enum';

export class SubmissionDto {
    id!: number;
    status!: SubmissionStatus;
    createdAt!: number;
    simpleProjectDraft: SimpleProjectDto;
}
