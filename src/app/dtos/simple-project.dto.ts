import { ProjectAssetDto } from './project-asset.dto';

export class SimpleProjectDto {
    id!: number;
    name!: string;
    shortDescription!: string;
    organizationId!: number;
    organizationName!: string;
    createdAt!: number;
    updatedAt!: number;
    thumbnail!: ProjectAssetDto;
}
