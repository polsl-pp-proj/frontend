import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { SearchQueryParamsDto } from 'src/app/dtos/search-query-params.dto';
import { SimpleProjectDto } from 'src/app/dtos/simple-project.dto';
import { SearchSortBy } from 'src/app/enums/search-sort-by.enum';
import { CategoryDto } from 'src/app/modules/category/modules/category-api/dtos/category.dto';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { HelpService } from 'src/app/modules/help/services/help.service';
import { ProjectService } from 'src/app/modules/project/services/project.service';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
    private subsink: Subscription[] = [];

    searchQueryParamsChange = new EventEmitter<SearchQueryParamsDto>();

    projectCards: SimpleProjectDto[] = [];

    categories: CategoryDto[] = [];

    searchQueryParams = new SearchQueryParamsDto({
        sort: SearchSortBy.Favorites,
        query: '',
        category: undefined,
    });

    get categoryOptions() {
        return this.categories.map((category) => ({
            text: category.name,
            value: category.id,
        }));
    }

    constructor(
        private readonly router: Router,
        private readonly helpService: HelpService,
        private readonly categoryService: CategoryService,
        private readonly projectService: ProjectService
    ) {}

    ngOnInit(): void {
        this.helpService.registerPageHelp('user/search-page');
        this.subsink.push(
            this.searchQueryParamsChange.pipe(debounceTime(500)).subscribe({
                next: (params: SearchQueryParamsDto) => {
                    this.search(params);
                },
            }),
            this.categoryService.getCategories().subscribe({
                next: (categories) => {
                    this.categories = categories;
                },
            })
        );
        this.search({});
    }

    search(params: SearchQueryParamsDto) {
        this.projectService
            .searchProjects(params)
            .subscribe(
                (searchResults) => (this.projectCards = searchResults.projects)
            );
    }

    ngOnDestroy(): void {
        this.subsink.forEach((sub) => sub.unsubscribe());
    }

    visitProject(projectId: number) {
        this.router.navigate(['project', projectId]);
    }

    SearchSortBy = SearchSortBy;
}
