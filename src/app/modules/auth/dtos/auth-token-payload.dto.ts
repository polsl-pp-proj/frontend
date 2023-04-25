import { UserRole } from '../enums/user-role.enum';

export class AuthTokenPayloadDto {
    userId!: number;
    uuid!: string;
    emailAddress!: string;
    firstName!: string;
    lastName!: string;
    role!: UserRole;
    isVerifiedStudent!: boolean;
    isActive!: boolean;
}
