export class RequestStudentshipVerificationDto {
    academicEmailAddress!: string;
    academicInstitutionId!: string;

    constructor(
        requestStudentshipVerificationDto: RequestStudentshipVerificationDto
    ) {
        Object.assign(this, requestStudentshipVerificationDto);
    }
}
