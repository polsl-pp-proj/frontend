import { OrganizationMemberRole } from '../../../enums/organization-member-role.enum';

export class OrganizationMemberDto {
    id!: number;
    firstName!: string;
    lastName!: string;
    emailAddress!: string;
    role!: OrganizationMemberRole;

    constructor(organizationMemberDto: OrganizationMemberDto) {
        Object.assign(this, organizationMemberDto);
    }
}
