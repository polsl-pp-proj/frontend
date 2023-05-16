export class CreateOrganizationDto {
    name!: string;

    constructor(createOrganizationDto: CreateOrganizationDto) {
        Object.assign(this, createOrganizationDto);
    }
}
