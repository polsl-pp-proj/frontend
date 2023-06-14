import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { studentshipApiRoutes } from '../studentship-api.routes';
import { RequestStudentshipVerificationDto } from '../dtos/request-studentship-verification.dto';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';

@Injectable({
    providedIn: 'root',
})
export class StudentshipApiService {
    constructor(private readonly apiService: CoreApiService) {}

    requestStudentshipVerification(
        academicEmailAddress: string,
        academicInstitutionId: string
    ) {
        return this.apiService.request<RequestStudentshipVerificationDto, void>(
            studentshipApiRoutes.POST_requestVerification,
            new RequestStudentshipVerificationDto({
                academicEmailAddress,
                academicInstitutionId,
            }),
            new ApiOptions() as ApiOptionsBody
        );
    }

    confirmStudentshipVerification(emailAddress: string, token: string) {
        return this.apiService.request<any, void>(
            studentshipApiRoutes.PATCH_confirmVerification,
            {},
            new ApiOptions({
                routeParams: { emailAddress, token },
            }) as ApiOptionsBody
        );
    }
}
