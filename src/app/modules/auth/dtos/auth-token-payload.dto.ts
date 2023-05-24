import { UserRole } from '../enums/user-role.enum';
import { UserOrganizationDto } from './user-organization.dto';

export class AuthTokenPayloadDto {
    userId!: number;
    uuid!: string;
    emailAddress!: string;
    firstName!: string;
    lastName!: string;
    role!: UserRole;
    isVerifiedStudent!: boolean;
    isActive!: boolean;
    organizations!: UserOrganizationDto[];
}
