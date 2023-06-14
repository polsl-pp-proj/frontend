import { PolonAcademicInstitutionStatus } from '../types/polon-academic-institution-status.type';

export class PolonAcademicInstitutionsDto {
    results!: never[];
    version!: '1.0';
    institutions!: {
        uid: string;
        name: string;
        status: PolonAcademicInstitutionStatus;
    }[];
}
