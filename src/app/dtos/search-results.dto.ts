import { SimpleProjectDto } from './simple-project.dto';

export class SearchResultsDto {
    page!: number;
    pageCount!: number;
    projects!: SimpleProjectDto[];
}
