import { AssetType } from '../enums/asset-type.enum';
import { CategoryDto } from './category.dto';
import { OpenPositionDto } from './open-position.dto';
import { ProjectAssetDto } from './project-asset.dto';

export class ProjectDto {
    id!: number;
    name!: string;
    organizationName!: string;
    shortDescription!: string;
    description!: string;
    fundingObjectives!: string | null;
    assets!: ProjectAssetDto[];
    categories!: CategoryDto[];
    openPositions!: OpenPositionDto[];
    createdAt!: number;
    updatedAt!: number;

    constructor(projectDto: ProjectDto) {
        Object.assign(this, projectDto);
    }
}
