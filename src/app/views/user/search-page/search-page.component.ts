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
import { SearchSortBy } from 'src/app/enums/search-sort-by.enum';
import { HelpService } from 'src/app/modules/help/services/help.service';

@Component({
    selector: 'app-search-page',
    templateUrl: './search-page.component.html',
    styleUrls: ['./search-page.component.scss'],
})
export class SearchPageComponent implements OnInit, OnDestroy {
    searchQueryParamsChange = new EventEmitter<SearchQueryParamsDto>();
    searchQueryParamsChangeSubscription!: Subscription;

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

    searchQueryParams = new SearchQueryParamsDto({
        sort: SearchSortBy.Favorites,
        query: '',
        category: undefined,
    });

    constructor(
        private readonly router: Router,
        private readonly helpService: HelpService
    ) {
        for (let i = 0; i < 25; ++i) {
            this.projectCards.push(this.projectCards[0]);
        }
    }

    ngOnInit(): void {
        this.searchQueryParamsChangeSubscription = this.searchQueryParamsChange
            .pipe(debounceTime(500))
            .subscribe({
                next: (params: SearchQueryParamsDto) => {
                    console.log(params);
                },
            });
        this.helpService.registerPageHelp('user/search-page');
    }

    ngOnDestroy(): void {
        this.searchQueryParamsChangeSubscription.unsubscribe();
    }

    visitProject(projectId: number) {
        this.router.navigate(['project', projectId]);
    }

    SearchSortBy = SearchSortBy;
}
