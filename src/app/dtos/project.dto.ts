import { CategoryDto } from './category.dto';
import { OpenPositionDto } from './open-position.dto';
import { ProjectAssetDto } from './project-asset.dto';

export class ProjectDto {
    id!: number;
    name!: string;
    shortDescription!: string;
    description!: string;
    fundingObjectives?: string;
    organizationId!: number;
    organizationName!: string;
    openPositions!: OpenPositionDto[];
    categories!: CategoryDto[];
    assets!: ProjectAssetDto[];
    createdAt!: number;
    updatedAt!: number;

    constructor(projectDto: ProjectDto) {
        Object.assign(this, projectDto);
    }
}
