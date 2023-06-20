import { CreateOpenPositionDto } from './create-open-position.dto';
import { ProjectAssetDto } from './project-asset.dto';

export class UpdateProjectDto {
    name!: string;
    shortDescription!: string;
    description!: string;
    fundingObjectives!: string | null;
    assets!: (number | ProjectAssetDto)[];
    categories!: number[];
    openPositions!: (CreateOpenPositionDto | number)[];

    constructor(updateProjectDto: UpdateProjectDto) {
        Object.assign(this, updateProjectDto);
    }
}
