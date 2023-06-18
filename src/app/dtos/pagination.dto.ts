export class PaginationDto {
    page = 1;
    elementsPerPage = 5;

    constructor(partialPaginationDto: Partial<PaginationDto>) {
        Object.assign(this, partialPaginationDto);
    }
}
