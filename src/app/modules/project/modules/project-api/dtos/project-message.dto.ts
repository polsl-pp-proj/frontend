export class ProjectMessageDto {
    subject!: string;
    message!: string;

    constructor(projectMessageDto: ProjectMessageDto) {
        Object.assign(this, projectMessageDto);
    }
}
