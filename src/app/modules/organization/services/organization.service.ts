import { Injectable } from '@angular/core';
import { OrganizationApiService } from '../modules/organization-api/services/organization-api.service';
import { MemberDto } from '../modules/organization-api/dtos/member.dto';

@Injectable({
    providedIn: 'root',
})
export class OrganizationService {
    constructor(
        private readonly organizationApiService: OrganizationApiService
    ) {}

    createOrganization(name: string) {
        return this.organizationApiService.createOrganization(name);
    }

    getAllOrganizations() {
        return this.organizationApiService.getAllOrganizations();
    }

    getOwnOrganizations() {
        return this.organizationApiService.getOwnOrganizations();
    }

    getOrganization(organizationId: number) {
        return this.organizationApiService.getOrganization(organizationId);
    }

    getOrganizationMembers(organizationId: number) {
        return this.organizationApiService.getOrganizationMembers(
            organizationId
        );
    }

    addOrganizationMembers(organizationId: number, members: MemberDto[]) {
        return this.organizationApiService.addOrganizationMembers(
            organizationId,
            members
        );
    }

    removeOrganizationMembers(organizationId: number, memberIds: number[]) {
        return this.organizationApiService.removeOrganizationMembers(
            organizationId,
            memberIds
        );
    }
}
