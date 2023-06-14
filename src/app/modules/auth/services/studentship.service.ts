import { Injectable } from '@angular/core';
import { StudentshipApiService } from '../modules/studentship-api/services/studentship-api.service';

@Injectable({
    providedIn: 'root',
})
export class StudentshipService {
    constructor(
        private readonly studentshipApiService: StudentshipApiService
    ) {}

    requestStudentshipVerification(
        academicEmailAddress: string,
        academicInstitutionId: string
    ) {
        return this.studentshipApiService.requestStudentshipVerification(
            academicEmailAddress,
            academicInstitutionId
        );
    }

    confirmStudentshipVerification(emailAddress: string, token: string) {
        return this.studentshipApiService.confirmStudentshipVerification(
            emailAddress,
            token
        );
    }
}
