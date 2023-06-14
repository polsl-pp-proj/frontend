import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { polonApiRoutes } from '../polon-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { PolonAcademicInstitutionsDto } from '../dtos/polon-academic-institutions.dto';
import { map } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class PolonApiService {
    constructor(private readonly apiService: CoreApiService) {}

    getAcademicInstitutions() {
        return this.apiService
            .request<PolonAcademicInstitutionsDto>(
                polonApiRoutes.GET_academicInstitutions,
                new ApiOptions() as ApiOptionsBody
            )
            .pipe(map((result) => result.institutions));
    }
}
