export class CategoryDto {
    id!: number;
    name!: string;

    constructor(categoryDto: CategoryDto) {
        Object.assign(this, categoryDto);
    }
}
