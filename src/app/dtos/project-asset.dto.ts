import { AssetType } from '../enums/asset-type.enum';

export class ProjectAssetDto {
    title!: string;
    url!: string;
    type!: AssetType;

    constructor(projectAssetDto: ProjectAssetDto) {
        Object.assign(this, projectAssetDto);
    }
}
