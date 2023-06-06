import { AssetType } from '../enums/asset-type.enum';
import { CategoryDto } from './category-dto';
import { NewOpenPositionDto } from './new-open-position.dto';
import { OpenPositionDto } from './open-position-dto';
import { ProjectAssetDto } from './project-asset-dto';

export class ProjectDto {
    id!: number;
    name!: string;
    shortDescription!: string;
    description?: string;
    projectGroupName!: string;
    assets!: { title: string; url: string; type: AssetType }[];
    categories!: CategoryDto[];
    createdAt?: number;
    updatedAt?: number;

    constructor(projectDto: ProjectDto) {
        Object.assign(this, projectDto);
    }
}

export class AddProjectDto {
    name!: string;
    shortDescription!: string;
    description?: string;
    projectGroupName!: string;
    assets!: Array<ProjectAssetDto | number>;
    categories!: CategoryDto[];
    openPositions!: NewOpenPositionDto[];

    constructor(addProjectDto: AddProjectDto) {
        Object.assign(this, addProjectDto);
    }
}

export class SimpleProjectDto {
    id!: number;
    name!: string;
    shortDescription!: string;
    projectGroupName!: string;
    thumbnail!: {
        title: string;
        url: string;
    };

    constructor(projectDto: SimpleProjectDto) {
        Object.assign(this, projectDto);
    }
}
