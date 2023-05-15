export class CreateOrganizationDto {
    organizationName: string;

    constructor(organizationName: string) {
        this.organizationName = organizationName;
    }
}
