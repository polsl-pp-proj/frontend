import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';
import { SubmissionStatus } from '../enums/submission-status.enum';

export class SubmissionDto {
    id!: number;
    projectDraft!: SimpleProjectDto;
    status!: SubmissionStatus;
    createdAt!: number;
}
