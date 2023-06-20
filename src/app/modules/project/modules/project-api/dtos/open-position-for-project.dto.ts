import { OpenPositionDto } from 'src/app/dtos/open-position.dto';

export class OpenPositionForProjectDto extends OpenPositionDto {
    projectId!: number;
    projectName!: string;

    constructor(openPosition: OpenPositionForProjectDto) {
        super(openPosition);
    }
}
