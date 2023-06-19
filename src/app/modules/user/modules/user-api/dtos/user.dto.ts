import { UserOrganizationDto } from 'src/app/modules/auth/dtos/user-organization.dto';
import { UserRole } from 'src/app/modules/auth/enums/user-role.enum';

export class SimpleUserDto {
    id!: number;
    emailAddress!: string;
    isActive!: boolean;

    constructor(simpleUserDto: SimpleUserDto) {
        Object.assign(this, simpleUserDto);
    }
}

export class UserDto extends SimpleUserDto {
    firstName!: string;
    lastName!: string;
    lastVerifiedAsStudent!: number | null;
    role!: UserRole;
    userOrganizations!: UserOrganizationDto[];
    createdAt!: number;

    constructor(userDto: UserDto) {
        super(userDto);
    }
}
