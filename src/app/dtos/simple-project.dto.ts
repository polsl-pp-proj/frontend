export class SimpleProjectDto {
    id!: number;
    name!: string;
    shortDescription!: string;
    organizationName!: string;
    thumbnail!: {
        title: string;
        url: string;
    };
}
