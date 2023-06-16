import { CreateOpenPositionDto } from './create-open-position.dto';

export class CreateProjectDto {
    name!: string;
    shortDescription!: string;
    description!: string;
    fundingObjectives!: string;
    assets!: number[];
    categories!: number[];
    openPositions!: CreateOpenPositionDto[];

    constructor(createProjectDto: CreateProjectDto) {
        Object.assign(this, createProjectDto);
    }
}
