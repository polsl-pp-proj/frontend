export class OrganizationDto {
    id!: number;
    name!: string;

    constructor(organizationDto: OrganizationDto) {
        Object.assign(this, organizationDto);
    }
}
