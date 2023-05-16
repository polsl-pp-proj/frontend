import { SearchSortBy } from "../enums/search-sort-by.enums";

export class SearchQueryParamsDto {
    sort?: SearchSortBy;
    query?: string;
    category?: number;

    constructor(searchQueryParamsDto: SearchQueryParamsDto) {
        Object.assign(this, searchQueryParamsDto);
    }
}
