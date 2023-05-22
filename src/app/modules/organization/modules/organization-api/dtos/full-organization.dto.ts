import { OrganizationMemberDto } from './organization-member.dto';
import { OrganizationDto } from './organization.dto';

export class FullOrganizationDto extends OrganizationDto {
    members!: OrganizationMemberDto[];

    constructor(organizationDto: FullOrganizationDto) {
        super(organizationDto);
        Object.assign(this, organizationDto);
    }
}
