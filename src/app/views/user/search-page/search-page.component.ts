import {
    Component,
    EventEmitter,
    OnDestroy,
    OnInit,
    Output,
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription, debounceTime } from 'rxjs';
import { ProjectCardDto } from 'src/app/dtos/project-card.dto';
import { SearchQueryParamsDto } from 'src/app/dtos/search-query-params.dto';
import { SearchSortBy } from 'src/app/enums/search-sort-by.enums';
import { CategoryDto } from 'src/app/modules/category/modules/category-api/dtos/category.dto';
import { CategoryService } from 'src/app/modules/category/services/category.service';
import { HelpService } from 'src/app/modules/help/services/help.service';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
    private subsink: Subscription[] = [];

    searchQueryParamsChange = new EventEmitter<SearchQueryParamsDto>();

    projectCards: ProjectCardDto[] = [
        {
            projectId: 2,
            imageUrl: 'https://placehold.co/1200x630',
            imageAlt: 'alt',
            projectName: 'rakieta',
            projectDescription: 'fajna rakieta',
            projectOrg: 'Zmitac studio original',
        },
    ];

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
        private readonly categoryService: CategoryService
    ) {
        for (let i = 0; i < 25; ++i) {
            this.projectCards.push(this.projectCards[0]);
        }
    }

    ngOnInit(): void {
        this.helpService.registerPageHelp('user/search-page');
        this.subsink.push(
            this.searchQueryParamsChange.pipe(debounceTime(500)).subscribe({
                next: (params: SearchQueryParamsDto) => {
                    console.log(params);
                },
            }),
            this.categoryService.getCategories().subscribe({
                next: (categories) => {
                    this.categories = categories;
                },
            })
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
