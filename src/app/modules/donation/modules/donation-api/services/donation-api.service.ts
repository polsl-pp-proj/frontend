import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { donationApiRoutes } from '../donation-api.routes';
import { PrepareProjectDonationDto } from '../dtos/prepare-project-donation.dto';
import { PreparedProjectDonationDto } from '../dtos/prepared-project-donation.dto';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';

@Injectable({
    providedIn: 'root',
})
export class DonationApiService {
    constructor(private readonly coreApiService: CoreApiService) {}

    prepareDonationForProject(
        projectId: number,
        projectDonationData: { amount: number; isAnonymous: boolean }
    ) {
        return this.coreApiService.request<
            PrepareProjectDonationDto,
            PreparedProjectDonationDto
        >(
            donationApiRoutes.POST_prepareDonationForProject,
            new PrepareProjectDonationDto(projectDonationData),
            new ApiOptions({ routeParams: { projectId } }) as ApiOptionsBody
        );
    }
}
