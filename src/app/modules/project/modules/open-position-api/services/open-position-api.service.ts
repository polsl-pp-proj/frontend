import { Injectable } from '@angular/core';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { OpenPositionForProjectDto } from '../../project-api/dtos/open-position-for-project.dto';
import { projectApiRoutes } from '../open-position-api.routes';
import { ApplyForOpenPositionDto } from '../dtos/apply-for-open-position.dto';

@Injectable({
    providedIn: 'root',
})
export class OpenPositionApiService {
    constructor(private readonly apiService: CoreApiService) {}

    getOrganizationOpenPositions(organizationId: number) {
        return this.apiService.request<OpenPositionForProjectDto[]>(
            projectApiRoutes.GET_organizationOpenPositions,
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    applyForOpenPosition(openPositionId: number, candidateSummary: string) {
        return this.apiService.request<ApplyForOpenPositionDto, void>(
            projectApiRoutes.POST_applyForOpenPosition,
            new ApplyForOpenPositionDto({ candidateSummary }),
            new ApiOptions({
                routeParams: { openPositionId },
            }) as ApiOptionsBody
        );
    }
}
