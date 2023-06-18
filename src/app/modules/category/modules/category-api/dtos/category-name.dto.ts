export class CategoryNameDto {
    name!: string;

    constructor(categoryNameDto: CategoryNameDto) {
        Object.assign(this, categoryNameDto);
    }
}
