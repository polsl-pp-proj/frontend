export class ProjectCardDto {
    projectId!: number;
    imageUrl!: string;
    imageAlt!: string;
    projectName!: string;
    projectDescription!: string;
    projectOrg!: string;

    constructor(projectCardDto: ProjectCardDto) {
        Object.assign(this, projectCardDto);
    }
}
