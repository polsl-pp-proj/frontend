import { Injectable } from '@angular/core';
import { OpenPositionApiService } from '../modules/open-position-api/services/open-position-api.service';

@Injectable({
    providedIn: 'root',
})
export class OpenPositionService {
    constructor(
        private readonly openPositionApiService: OpenPositionApiService
    ) {}

    getOrganizationOpenPositions(organizationId: number) {
        return this.openPositionApiService.getOrganizationOpenPositions(
            organizationId
        );
    }

    applyForOpenPosition(openPositionId: number, candidateSummary: string) {
        return this.openPositionApiService.applyForOpenPosition(
            openPositionId,
            candidateSummary
        );
    }
}
