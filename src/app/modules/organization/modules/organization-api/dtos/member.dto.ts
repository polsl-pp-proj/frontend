import { OrganizationMemberRole } from '../../../enums/organization-member-role.enum';

export class MemberDto {
    emailAddress!: string;
    memberRole!: OrganizationMemberRole;

    constructor(memberDto: MemberDto) {
        Object.assign(this, memberDto);
    }
}
