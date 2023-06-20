import { Injectable } from '@angular/core';
import { CoreApiService } from 'src/app/modules/api/services/core-api.service';
import { organizationApiRoutes } from '../organization-api.routes';
import {
    ApiOptions,
    ApiOptionsBody,
} from 'src/app/modules/api/classes/api-options.class';
import { CreateOrganizationDto } from '../dtos/create-organization.dto';
import { MemberDto } from '../dtos/member.dto';
import { OrganizationDto } from '../dtos/organization.dto';
import { AddMembersDto } from '../dtos/add-members.dto';
import { RemoveMembersDto } from '../dtos/remove-members.dto';
import { FullOrganizationDto } from '../dtos/full-organization.dto';
import { OrganizationMemberDto } from '../dtos/organization-member.dto';

@Injectable({
    providedIn: 'root',
})
export class OrganizationApiService {
    constructor(private readonly coreApiService: CoreApiService) {}

    createOrganization(name: string) {
        return this.coreApiService.request<CreateOrganizationDto, void>(
            organizationApiRoutes.POST_createOrganization,
            new CreateOrganizationDto({ name }),
            new ApiOptions() as ApiOptionsBody
        );
    }

    getOwnOrganizations() {
        return this.coreApiService.request<OrganizationDto[], never>(
            organizationApiRoutes.GET_ownOrganizations,
            new ApiOptions() as ApiOptionsBody
        );
    }

    getAllOrganizations() {
        return this.coreApiService.request<OrganizationDto[], never>(
            organizationApiRoutes.GET_allOrganizations,
            new ApiOptions() as ApiOptionsBody
        );
    }

    getOrganization(organizationId: number) {
        return this.coreApiService.request<OrganizationDto, never>(
            organizationApiRoutes.GET_organization,
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    getFullOrganization(organizationId: number) {
        return this.coreApiService.request<FullOrganizationDto, never>(
            organizationApiRoutes.GET_fullOrganization,
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    getOrganizationMembers(organizationId: number) {
        return this.coreApiService.request<OrganizationMemberDto[], void>(
            organizationApiRoutes.GET_organizationMembers,
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    addOrganizationMembers(organizationId: number, members: MemberDto[]) {
        return this.coreApiService.request<AddMembersDto, void>(
            organizationApiRoutes.POST_addOrganizationMembers,
            new AddMembersDto({ memebers: members }),
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }

    removeOrganizationMembers(organizationId: number, memberIds: number[]) {
        return this.coreApiService.request<RemoveMembersDto, void>(
            organizationApiRoutes.POST_addOrganizationMembers,
            new RemoveMembersDto({ memberIds }),
            new ApiOptions({
                routeParams: { organizationId },
            }) as ApiOptionsBody
        );
    }
}
